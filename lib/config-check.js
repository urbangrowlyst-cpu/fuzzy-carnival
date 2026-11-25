/*
 * PATASA · CONFIG CHECK
 * Shared by the browser and the server so both read the same cleaned data.
 * No secrets belong in this file.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.PatasaConfig = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CATEGORIES = ["Gelatos", "Mithai", "Cakes"];
  const LIMITS = {
    shopName: 60,
    tagline: 120,
    address: 220,
    link: 500,
    dishName: 70,
    keyword: 80,
    fact: 120,
    dishes: 50,
    keywords: 40,
    facts: 20,
  };
  const PLACEHOLDER = /\b(?:paste|insert)\b|your\s+.*\bhere\b|example\.com/i;

  function stripHtml(value) {
    let text = String(value == null ? "" : value);
    text = text.replace(
      /<\s*(script|style|iframe|object|embed|template|noscript)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
      " "
    );
    text = text.replace(/<[^>]*>/g, " ");
    text = text.replace(/javascript\s*:/gi, "");
    return text;
  }

  function cleanText(value, maxLength) {
    let text = stripHtml(value);
    text = text
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
      .replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g, "")
      .replace(/\p{Extended_Pictographic}/gu, "")
      .replace(/\s+/g, " ")
      .trim();
    if (typeof maxLength === "number" && text.length > maxLength) {
      text = text.slice(0, maxLength).trim();
    }
    return text;
  }

  function cleanListValue(value) {
    return cleanText(value, null).replace(/[\s,;]+$/g, "").trim();
  }

  function isPlaceholder(value) {
    return PLACEHOLDER.test(String(value || ""));
  }

  function normaliseUrl(raw, options) {
    const opts = options || {};
    let text = cleanText(raw, LIMITS.link);
    if (!text) {
      return { value: "", state: "empty" };
    }
    if (isPlaceholder(text)) {
      return { value: "", state: "placeholder", raw: text };
    }

    let warning = "";

    if (opts.whatsapp && /^[+\d][\d\s().-]{6,}$/.test(text)) {
      const digits = text.replace(/\D/g, "");
      if (digits.length < 8 || digits.length > 15) {
        return {
          value: "",
          state: "invalid",
          message: "Use the country code and 8 to 15 digits for the WhatsApp number.",
        };
      }
      return {
        value: "https://wa.me/" + digits,
        state: "valid",
        message: "",
      };
    }

    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) {
      if (/^[\w.-]+\.[a-z]{2,}(?:[/?#]|$)/i.test(text)) {
        text = "https://" + text;
        warning = "https:// was added automatically.";
      } else {
        return {
          value: "",
          state: "invalid",
          message: "The link must be a complete web address starting with https://",
        };
      }
    }

    let parsed;
    try {
      parsed = new URL(text);
    } catch (error) {
      return {
        value: "",
        state: "invalid",
        message: "The link is not a valid web address.",
      };
    }

    if (parsed.protocol !== "https:") {
      return {
        value: "",
        state: "invalid",
        message: "The link must start with https://",
      };
    }
    if (parsed.username || parsed.password) {
      return {
        value: "",
        state: "invalid",
        message: "The link must not contain a username or password.",
      };
    }

    return {
      value: parsed.href,
      state: "valid",
      message: warning,
    };
  }

  function validateConfig(raw) {
    const errors = [];
    const warnings = [];
    const config = {
      settings: {
        shopName: "Patasa",
        tagline: "",
        address: "",
        googleReviewLink: "",
        instagram: "",
        facebook: "",
        whatsapp: "",
        website: "",
      },
      dishes: [],
      seoKeywords: [],
      shopFacts: [],
    };

    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      errors.push("The shop config could not be read. Check shop-config.js for a missing bracket or comma.");
      return { config, errors, warnings };
    }

    const settings = raw.settings && typeof raw.settings === "object" ? raw.settings : {};

    const shopName = cleanText(settings.shopName, LIMITS.shopName);
    if (shopName) {
      config.settings.shopName = shopName;
    } else {
      errors.push("Shop name is missing. Add it under SETTINGS.");
    }

    const tagline = cleanText(settings.tagline, LIMITS.tagline);
    config.settings.tagline = tagline;

    const address = cleanText(settings.address, LIMITS.address);
    if (address) {
      config.settings.address = address;
    } else {
      errors.push("Shop address is missing. Add it under SETTINGS.");
    }

    const google = normaliseUrl(settings.googleReviewLink);
    if (google.state === "valid") {
      config.settings.googleReviewLink = google.value;
      if (google.message) {
        warnings.push("Google review link: " + google.message);
      }
    } else if (google.state === "empty") {
      errors.push("Google review link is missing. Paste it under SETTINGS.");
    } else if (google.state === "placeholder") {
      errors.push("Google review link is still a placeholder. Paste your real Google review link under SETTINGS.");
    } else {
      errors.push("Google review link is not valid. " + google.message);
    }

    const optionalLinks = [
      ["instagram", "Instagram"],
      ["facebook", "Facebook"],
      ["whatsapp", "WhatsApp"],
      ["website", "Website"],
    ];

    optionalLinks.forEach(function (entry) {
      const key = entry[0];
      const label = entry[1];
      const result = normaliseUrl(settings[key], { whatsapp: key === "whatsapp" });
      if (result.state === "valid") {
        config.settings[key] = result.value;
        if (result.message) {
          warnings.push(label + " link: " + result.message);
        }
      } else if (result.state === "placeholder") {
        warnings.push(label + " link is still a placeholder. That button will be hidden.");
      } else if (result.state === "invalid") {
        warnings.push(label + " link is not valid. " + result.message + " That button will be hidden.");
      }
    });

    const rawDishes = Array.isArray(raw.dishes) ? raw.dishes : [];
    const seenDishes = new Set();

    rawDishes.slice(0, LIMITS.dishes).forEach(function (item, index) {
      if (!item || typeof item !== "object") {
        warnings.push("A dish at position " + (index + 1) + " was skipped because it is not formatted correctly.");
        return;
      }

      const nameRaw = typeof item.name === "string" ? item.name : "";
      const name = cleanText(nameRaw, LIMITS.dishName);
      if (!name) {
        warnings.push("A dish at position " + (index + 1) + " was skipped because its name is empty.");
        return;
      }
      if (nameRaw.trim().length > LIMITS.dishName) {
        warnings.push('The dish name "' + name + '" was shortened to ' + LIMITS.dishName + " characters.");
      }

      const categoryRaw = cleanText(item.category, 30);
      const category = CATEGORIES.find(function (value) {
        return value.toLowerCase() === categoryRaw.toLowerCase();
      });
      if (!category) {
        warnings.push('The dish "' + name + '" was skipped because its category must be Gelatos, Mithai or Cakes.');
        return;
      }

      let enabled = true;
      if (item.enabled === false || item.enabled === "false" || item.enabled === 0) {
        enabled = false;
      } else if (item.enabled === true || item.enabled === "true" || item.enabled === 1) {
        enabled = true;
      } else if (typeof item.enabled !== "undefined") {
        warnings.push('The dish "' + name + '" has an unusual enabled value. It was switched on.');
      }

      const key = name.toLowerCase();
      if (seenDishes.has(key)) {
        warnings.push('The dish "' + name + '" appears more than once. The repeat was skipped.');
        return;
      }
      seenDishes.add(key);
      config.dishes.push({ name: name, category: category, enabled: enabled });
    });

    if (rawDishes.length > LIMITS.dishes) {
      warnings.push("Only the first " + LIMITS.dishes + " dishes are used.");
    }

    if (config.dishes.length === 0) {
      errors.push("No dishes were found. Add at least one dish under DISHES.");
    } else if (!config.dishes.some(function (dish) { return dish.enabled; })) {
      errors.push("Every dish is switched off. Set enabled: true on at least one dish under DISHES.");
    }

    const rawKeywords = Array.isArray(raw.seoKeywords) ? raw.seoKeywords : [];
    const seenKeywords = new Set();

    rawKeywords.slice(0, LIMITS.keywords).forEach(function (item, index) {
      const rawValue = cleanListValue(item);
      if (!rawValue) {
        warnings.push("A keyword at position " + (index + 1) + " was skipped because it is empty.");
        return;
      }
      const keyword = cleanText(rawValue, LIMITS.keyword);
      if (rawValue.length > LIMITS.keyword) {
        warnings.push('The keyword "' + keyword + '" was shortened to ' + LIMITS.keyword + " characters.");
      }
      const key = keyword.toLowerCase();
      if (seenKeywords.has(key)) {
        warnings.push('The keyword "' + keyword + '" appears more than once. The repeat was skipped.');
        return;
      }
      seenKeywords.add(key);
      config.seoKeywords.push(keyword);
    });

    if (rawKeywords.length > LIMITS.keywords) {
      warnings.push("Only the first " + LIMITS.keywords + " SEO keywords are used.");
    }
    if (config.seoKeywords.length === 0) {
      errors.push("No SEO keywords were found. Add at least one phrase under SEO KEYWORDS.");
    }

    const rawFacts = Array.isArray(raw.shopFacts) ? raw.shopFacts : [];
    const seenFacts = new Set();

    rawFacts.slice(0, LIMITS.facts).forEach(function (item, index) {
      const rawValue = cleanListValue(item);
      if (!rawValue) {
        warnings.push("A shop fact at position " + (index + 1) + " was skipped because it is empty.");
        return;
      }
      const fact = cleanText(rawValue, LIMITS.fact);
      if (rawValue.length > LIMITS.fact) {
        warnings.push('A shop fact was shortened to ' + LIMITS.fact + " characters.");
      }
      const key = fact.toLowerCase();
      if (seenFacts.has(key)) {
        return;
      }
      seenFacts.add(key);
      config.shopFacts.push(fact);
    });

    if (rawFacts.length > LIMITS.facts) {
      warnings.push("Only the first " + LIMITS.facts + " shop facts are used.");
    }

    return { config: config, errors: errors, warnings: warnings };
  }

  function categoriesWithEnabledDishes(config) {
    const result = {};
    CATEGORIES.forEach(function (category) {
      result[category] = (config.dishes || []).some(function (dish) {
        return dish.enabled && dish.category === category;
      });
    });
    return result;
  }

  return {
    CATEGORIES: CATEGORIES,
    LIMITS: LIMITS,
    cleanText: cleanText,
    isPlaceholder: isPlaceholder,
    validateConfig: validateConfig,
    categoriesWithEnabledDishes: categoriesWithEnabledDishes,
  };
});
