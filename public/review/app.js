/*
 * PATASA · PAGE BEHAVIOUR
 * No API keys, no secrets, no HTML injection. AI text is always placed into a
 * textarea with .value, so it is shown as plain text and can be edited.
 */
(function () {
  "use strict";

  const els = {
    shopName: document.getElementById("shop-name"),
    shopPlace: document.getElementById("shop-place"),
    shopTagline: document.getElementById("shop-tagline"),
    shopFactWrap: document.getElementById("shop-fact-wrap"),
    shopFact: document.getElementById("shop-fact"),
    addressText: document.getElementById("address-text"),
    copyright: document.getElementById("copyright"),
    setupNotice: document.getElementById("setup-notice"),
    setupList: document.getElementById("setup-list"),
    chips: Array.from(document.querySelectorAll(".tag")),
    counter: document.getElementById("counter"),
    reviewSlip: document.getElementById("review-slip"),
    reviewState: document.getElementById("review-state"),
    reviewCount: document.getElementById("review-count"),
    reviewText: document.getElementById("review-text"),
    reviewStatus: document.getElementById("review-status"),
    shuffle: document.getElementById("shuffle"),
    copyButton: document.getElementById("copy-post"),
    toast: document.getElementById("toast"),
    honeypot: document.getElementById("hp-website"),
    description: document.querySelector('meta[name="description"]'),
  };

  const state = {
    config: null,
    configErrors: [],
    configWarnings: [],
    category: "Gelatos",
    review: "",
    lastDish: "",
    lastKeywords: [],
    controller: null,
    loading: false,
    toastTimer: null,
    toastHideTimer: null,
    printTimer: null,
    started: false,
    userEdited: false,
    hadInstant: false,
  };

  const STORAGE_KEY = "patasa:last-review";

  function setStatus(message) {
    if (els.reviewStatus.textContent !== message) {
      els.reviewStatus.textContent = message;
    }
  }

  function showSetup(messages) {
    els.setupList.replaceChildren();
    messages.forEach(function (message) {
      const item = document.createElement("li");
      item.textContent = message;
      els.setupList.appendChild(item);
    });
    els.setupNotice.hidden = false;
  }

  function splitTagline(tagline) {
    const parts = String(tagline || "")
      .split("·")
      .map(function (part) { return part.trim(); })
      .filter(Boolean);

    if (!parts.length) {
      return { descriptor: "", place: "" };
    }
    if (parts.length === 1) {
      return { descriptor: parts[0], place: "" };
    }
    return {
      descriptor: parts.slice(0, -1).join(" · "),
      place: parts[parts.length - 1].replace(/,\s*/g, " · "),
    };
  }

  function renderSettings(settings) {
    const shopName = settings.shopName || "Patasa";
    const tagline = splitTagline(settings.tagline);
    const fact = Array.isArray(state.config.shopFacts) && state.config.shopFacts.length
      ? state.config.shopFacts[0]
      : "";

    els.shopName.textContent = shopName;
    document.title = "Your review | " + shopName + ", Nerul";

    if (els.description) {
      els.description.setAttribute(
        "content",
        "A short review draft for " + shopName + ", the mithai and gelato counter in Nerul, Navi Mumbai. Edit it, copy it, and open urbangrowlyst.in."
      );
    }

    els.shopTagline.textContent = tagline.descriptor;
    els.shopTagline.hidden = !tagline.descriptor;
    els.shopPlace.textContent = tagline.place;
    els.shopPlace.hidden = !tagline.place;

    els.shopFact.textContent = fact;
    els.shopFactWrap.hidden = !fact;

    els.addressText.textContent = settings.address || "Nerul, Navi Mumbai";
    els.copyright.textContent = "\u00A9 2026 " + shopName;

  }

  function applyCategories() {
    const availability = window.PatasaConfig.categoriesWithEnabledDishes(state.config);
    const anyAvailable = state.config.dishes.some(function (dish) { return dish.enabled; });

    els.chips.forEach(function (chip) {
      const category = chip.getAttribute("data-category");
      let available = true;
      if (category === "All") {
        available = anyAvailable;
      } else {
        available = Boolean(availability[category]);
      }
      chip.disabled = !available;
      if (!available) {
        chip.setAttribute("aria-label", category + ", no dishes available yet");
      } else {
        chip.removeAttribute("aria-label");
      }
    });
  }

  function selectCategory(category) {
    state.category = category;
    els.counter.setAttribute("data-category", category);
    els.chips.forEach(function (chip) {
      const selected = chip.getAttribute("data-category") === category;
      chip.classList.toggle("is-selected", selected);
      chip.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function readStoredLast() {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return;
      }
      if (typeof parsed.dish === "string") {
        state.lastDish = parsed.dish.slice(0, 80);
      }
      if (Array.isArray(parsed.keywords)) {
        state.lastKeywords = parsed.keywords
          .filter(function (item) { return typeof item === "string"; })
          .slice(0, 2)
          .map(function (item) { return item.slice(0, 80); });
      }
    } catch (error) {
      // Session storage may be unavailable in private browsing; not essential.
    }
  }

  function storeLast(dish, keywords) {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dish: dish || "", keywords: Array.isArray(keywords) ? keywords.slice(0, 2) : [] })
      );
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function updateWordCount() {
    const text = els.reviewText.value.trim();
    const count = text && window.PatasaFallback && window.PatasaFallback.countWords
      ? window.PatasaFallback.countWords(text)
      : (text ? text.split(/\s+/).length : 0);
    els.reviewCount.textContent = count === 1 ? "1 word" : count + " words";
  }

  function setLoading(loading) {
    state.loading = loading;
    els.shuffle.disabled = loading;
    els.shuffle.setAttribute("aria-busy", loading ? "true" : "false");
    els.reviewText.disabled = loading || state.configErrors.length > 0;
    els.reviewSlip.setAttribute("aria-busy", loading ? "true" : "false");

    if (loading) {
      els.reviewSlip.setAttribute("data-state", "loading");
      els.reviewState.textContent = "writing";
      els.reviewCount.textContent = "…";
      els.copyButton.disabled = true;
      els.reviewText.setAttribute("placeholder", "Writing a fresh review…");
      setStatus("Writing a fresh review…");
      return;
    }

    if (els.reviewSlip.getAttribute("data-state") === "loading") {
      els.reviewSlip.setAttribute("data-state", "ready");
      els.reviewState.textContent = "ready";
    }

    updateWordCount();

    const hasText = els.reviewText.value.trim().length > 0;
    const hasLink = Boolean(state.config && state.config.settings.googleReviewLink);
    els.copyButton.disabled = !hasText || !hasLink || state.configErrors.length > 0;
  }

  function validateServerReview(data) {
    if (!data || typeof data.review !== "string") {
      return null;
    }
    const review = data.review.trim().slice(0, 600);
    if (!review) {
      return null;
    }

    const knownDish = state.config.dishes.some(function (dish) {
      return dish.enabled && dish.name === data.dish;
    });
    const dish = knownDish ? data.dish : "";
    const keywords = Array.isArray(data.keywords)
      ? data.keywords
          .filter(function (keyword) {
            return typeof keyword === "string" && state.config.seoKeywords.includes(keyword);
          })
          .slice(0, 2)
      : [];

    return { review: review, dish: dish, keywords: keywords };
  }

  function applyReview(review, dish, keywords, source) {
    els.reviewText.value = review;
    state.review = review;

    if (dish) {
      state.lastDish = dish;
    }
    if (keywords.length) {
      state.lastKeywords = keywords;
    }
    storeLast(state.lastDish, state.lastKeywords);

    els.reviewSlip.setAttribute("data-state", source === "backup" ? "backup" : "ready");
    els.reviewState.textContent = "ready";
    updateWordCount();

    els.reviewText.disabled = false;
    els.copyButton.disabled = !review.trim() || !state.config.settings.googleReviewLink;
    setStatus("Written for you. Edit it if you like.");

    window.clearTimeout(state.printTimer);
    els.reviewSlip.classList.remove("is-printing");
    els.reviewSlip.getBoundingClientRect();
    els.reviewSlip.classList.add("is-printing");
    state.printTimer = window.setTimeout(function () {
      els.reviewSlip.classList.remove("is-printing");
    }, 520);
  }

  function localFallback() {
    if (!window.PatasaFallback) {
      return null;
    }
    return window.PatasaFallback.createFallbackReview({
      config: state.config,
      category: state.category,
      avoidDish: state.lastDish,
      avoidKeywords: state.lastKeywords,
    });
  }

  async function requestReview() {
    if (!state.config || state.configErrors.length) {
      return;
    }

    if (state.controller) {
      state.controller.abort();
      state.controller = null;
    }

    const controller = new AbortController();
    state.controller = controller;
    const timer = window.setTimeout(function () {
      controller.abort();
    }, 12000);

    setLoading(true);
    state.started = true;
    state.userEdited = false;
    state.hadInstant = false;

    const instant = localFallback();
    if (instant) {
      state.hadInstant = true;
      applyReview(instant.review, instant.dish, instant.keywords, "backup");
      setStatus("Writing a fresh review\u2026");
    }

    try {
      const payload = {
        category: state.category,
        avoidDish: state.lastDish,
        avoidKeywords: state.lastKeywords,
        website: els.honeypot ? els.honeypot.value.trim() : "",
      };

      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: "same-origin",
        cache: "no-store",
      });

      if (state.controller !== controller) {
        return;
      }

      if (!response.ok) {
        throw new Error("Review request failed");
      }

      const data = await response.json();
      const checked = validateServerReview(data);
      if (!checked) {
        throw new Error("Review response was not usable");
      }

      if (!state.userEdited && (!state.hadInstant || data.source === "ai")) {
        applyReview(checked.review, checked.dish, checked.keywords, data.source === "backup" ? "backup" : "ai");
      }
    } catch (error) {
      if (state.controller !== controller) {
        return;
      }

      if (!state.hadInstant) {
        const fallback = localFallback();
        if (fallback) {
          applyReview(fallback.review, fallback.dish, fallback.keywords, "backup");
        } else {
          els.reviewText.value = "";
          els.reviewText.disabled = true;
          els.copyButton.disabled = true;
          els.reviewSlip.setAttribute("data-state", "error");
          els.reviewState.textContent = "try again";
          els.reviewCount.textContent = "0 words";
          setStatus("A review could not be prepared. Please try again.");
        }
      }
    } finally {
      window.clearTimeout(timer);
      if (state.controller === controller) {
        state.controller = null;
        setLoading(false);
      }
    }
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Fall through to the legacy path.
      }
    }

    const textarea = els.reviewText;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.focus();
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    try {
      textarea.setSelectionRange(start, end);
    } catch (error) {
      // Ignore selection restore errors.
    }
    return copied;
  }

  function showToast(message) {
    if (!els.toast) {
      return;
    }
    window.clearTimeout(state.toastTimer);
    window.clearTimeout(state.toastHideTimer);
    els.toast.textContent = message;
    els.toast.hidden = false;
    window.requestAnimationFrame(function () {
      els.toast.classList.add("is-visible");
    });
    state.toastTimer = window.setTimeout(function () {
      els.toast.classList.remove("is-visible");
      state.toastHideTimer = window.setTimeout(function () {
        els.toast.hidden = true;
      }, 240);
    }, 3400);
  }

  async function handleCopyAndPost() {
    const text = els.reviewText.value.trim();
    const link = state.config && state.config.settings.googleReviewLink;

    if (!text) {
      setStatus("Add a few words before posting.");
      els.reviewText.focus();
      return;
    }
    if (!link) {
      showToast("The link is not ready yet.");
      return;
    }

    els.copyButton.disabled = true;
    const copied = await copyToClipboard(text);

    if (!copied) {
      showToast("Could not copy. Select the review text and copy it manually.");
      els.reviewText.focus();
      els.reviewText.select();
      els.copyButton.disabled = false;
      return;
    }

    showToast("Copied. Paste it on urbangrowlyst.in.");

    let opened = false;
    try {
      const win = window.open(link, "_blank", "noopener,noreferrer");
      opened = Boolean(win);
    } catch (error) {
      opened = false;
    }

    if (!opened) {
      window.location.href = link;
    }

    window.setTimeout(function () {
      if (state.configErrors.length === 0) {
        els.copyButton.disabled = els.reviewText.value.trim().length === 0;
      }
    }, 1200);
  }

  function bindEvents() {
    els.shuffle.addEventListener("click", function () {
      requestReview();
    });

    els.chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.disabled) {
          return;
        }
        const category = chip.getAttribute("data-category");
        if (!category || category === state.category) {
          return;
        }
        selectCategory(category);
        requestReview();
      });
    });

    els.reviewText.addEventListener("input", function () {
      state.review = els.reviewText.value;
      updateWordCount();
      const hasText = els.reviewText.value.trim().length > 0;
      if (!hasText) {
        els.copyButton.disabled = true;
        setStatus("Add a few words before posting.");
      } else if (!state.loading) {
        els.copyButton.disabled = !state.config.settings.googleReviewLink;
        setStatus("Edit it if you like, then post it.");
      }
    });

    els.copyButton.addEventListener("click", handleCopyAndPost);
  }

  function stopForSetup(errors) {
    state.configErrors = errors.slice();
    showSetup(errors);
    els.chips.forEach(function (chip) { chip.disabled = true; });
    els.shuffle.disabled = true;
    els.copyButton.disabled = true;
    els.reviewText.disabled = true;
    els.reviewText.setAttribute("placeholder", "The review setup is not finished yet.");
    els.reviewSlip.setAttribute("data-state", "setup");
    els.reviewState.textContent = "setup";
    els.reviewCount.textContent = "0 words";
    setStatus("The shop setup needs attention before reviews can be made.");
    errors.forEach(function (message) {
      console.error("[Patasa] " + message);
    });
  }

  function init() {
    if (!window.PatasaConfig || !window.PatasaFallback) {
      stopForSetup(["The setup files did not load. Refresh the page, or check that the lib folder was uploaded."]);
      return;
    }

    const result = window.PatasaConfig.validateConfig(window.PATASA_CONFIG);
    state.config = result.config;
    state.configWarnings = result.warnings;

    renderSettings(result.config.settings);
    selectCategory("Gelatos");
    applyCategories();
    readStoredLast();
    bindEvents();

    if (result.warnings.length) {
      result.warnings.forEach(function (message) {
        console.warn("[Patasa] Setup note: " + message);
      });
    }

    if (result.errors.length) {
      stopForSetup(result.errors);
      return;
    }

    requestReview();
  }

  init();
})();
