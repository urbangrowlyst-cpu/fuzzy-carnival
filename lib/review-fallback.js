/*
 * PATASA · BACKUP REVIEWS
 * These are used when the AI is unavailable, the rate limit is reached, or the
 * page is viewed without an API key. They never invent a claim; a shop fact is
 * used only when it is present in shop-config.js.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.PatasaFallback = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const OPENINGS = [
    "I picked up the {dish} at {shop} in Nerul and truly enjoyed it.",
    "The {dish} at {shop} in Nerul was the highlight of my visit.",
    "I tried the {dish} at {shop} in Nerul and it really hit the spot.",
    "{shop} in Nerul has become my go-to for the {dish}.",
    "Stopped by {shop} in Nerul for the {dish} and left happy.",
    "The {dish} from {shop} in Nerul is worth the trip.",
    "I keep coming back to {shop} in Nerul for the {dish}.",
    "A friend sent me to {shop} in Nerul for the {dish}, and I am glad I went.",
  ];

  const KEYWORD_LINES = [
    "If you are looking for {keyword}, this is a lovely little find.",
    "For anyone searching for {keyword}, {shop} is worth a visit.",
    "It is a good stop when you want {keyword}.",
    "I would happily recommend it for {keyword}.",
    "When it comes to {keyword}, this place is a lovely surprise.",
    "It is a handy stop for {keyword}.",
    "Anyone after {keyword} should keep {shop} in mind.",
  ];

  const CLOSERS = [
    "I will be back for more.",
    "Already planning my next visit.",
    "A lovely little stop.",
    "Glad I found this place.",
    "Worth a visit when you are nearby.",
  ];

  function normalise(value) {
    return String(value == null ? "" : value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function countWords(value) {
    const text = String(value || "").trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function countSentences(value) {
    const matches = String(value || "").match(/[.!?](?=\s|$)/g);
    return matches ? matches.length : 0;
  }

  function shuffle(items, random) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      const temp = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = temp;
    }
    return copy;
  }

  function pick(list, random) {
    return list[Math.floor(random() * list.length)];
  }

  function fill(template, values) {
    return template
      .replace(/\{dish\}/g, values.dish)
      .replace(/\{shop\}/g, values.shop)
      .replace(/\{keyword\}/g, values.keyword)
      .replace(/\{fact\}/g, values.fact);
  }

  /*
   * Keywords are often written the way people search, for example
   * "eggless sweets Navi Mumbai". Add only the small joining words needed to
   * make the phrase read naturally inside a review, without changing its
   * search meaning.
   */
  function keywordFitsCategory(keyword, category) {
    const text = String(keyword == null ? "" : keyword).toLowerCase();
    if (!category || category === "All") {
      return true;
    }
    const saysGelato = /\bgelato\b/.test(text);
    const saysMithai = /\bmithai\b/.test(text);
    const saysCake = /\b(?:cakes?|pastr(?:y|ies)|bakes?)\b/.test(text);
    if (category === "Mithai") {
      return !saysGelato && !saysCake;
    }
    if (category === "Gelatos") {
      return !saysMithai && !saysCake;
    }
    if (category === "Cakes") {
      return !saysMithai && !saysGelato;
    }
    return true;
  }

  function naturaliseKeyword(keyword) {
    let text = String(keyword == null ? "" : keyword).trim();
    if (/\bNavi Mumbai\b/i.test(text) && !/\bin\s+Navi Mumbai\b/i.test(text)) {
      text = text.replace(/\s+Navi Mumbai\b/i, " in Navi Mumbai");
    } else if (/\bNerul\b/i.test(text) && !/\bin\s+Nerul\b/i.test(text)) {
      text = text.replace(/\s+Nerul\b/i, " in Nerul");
    }
    if (/^(best|finest|top|ultimate)\b/i.test(text)) {
      return "the " + text;
    }
    return text;
  }

  function isUsable(review, expected) {
    const words = countWords(review);
    const sentences = countSentences(review);
    if (words < 25 || words > 45) {
      return false;
    }
    if (sentences < 2 || sentences > 3) {
      return false;
    }
    const text = " " + normalise(review) + " ";
    return (
      text.includes(" " + normalise(expected.shop) + " ") &&
      text.includes(" " + normalise("Nerul") + " ") &&
      text.includes(" " + normalise(expected.dish) + " ") &&
      text.includes(" " + normalise(expected.keyword) + " ")
    );
  }

  function createFallbackReview(input) {
    const options = input || {};
    const config = options.config || {};
    const random = typeof options.random === "function" ? options.random : Math.random;
    const category = options.category || "All";
    const shop = (config.settings && config.settings.shopName) || "Patasa";
    const allDishes = Array.isArray(config.dishes) ? config.dishes : [];
    const allKeywords = Array.isArray(config.seoKeywords) ? config.seoKeywords : [];

    const dishes = allDishes.filter(function (dish) {
      return dish && dish.enabled && (category === "All" || dish.category === category);
    });
    if (!dishes.length || !allKeywords.length) {
      return null;
    }

    const avoidedDish = normalise(options.avoidDish);
    let dishPool = dishes.filter(function (dish) {
      return normalise(dish.name) !== avoidedDish;
    });
    if (!dishPool.length) {
      dishPool = dishes;
    }

    const pickedDish = pick(dishPool, random);
    const dish = pickedDish.name;
    const dishCategory = pickedDish.category;

    // Keep the keyword in the same family as the chosen dish. A mithai
    // review should not recommend gelato, even when "All" is selected.
    const fittingKeywords = allKeywords.filter(function (keyword) {
      return keywordFitsCategory(keyword, dishCategory);
    });
    const categoryKeywords = fittingKeywords.length ? fittingKeywords : allKeywords;
    const avoidedKeywords = new Set(
      (Array.isArray(options.avoidKeywords) ? options.avoidKeywords : []).map(normalise)
    );
    let keywordPool = categoryKeywords.filter(function (keyword) {
      return !avoidedKeywords.has(normalise(keyword));
    });
    if (!keywordPool.length) {
      keywordPool = categoryKeywords;
    }

    const keywords = shuffle(keywordPool, random);
    const openings = shuffle(OPENINGS, random);
    const keywordLines = shuffle(KEYWORD_LINES, random);
    const thirdLines = shuffle(CLOSERS, random);

    let fallback = null;

    for (let k = 0; k < keywords.length && !fallback; k += 1) {
      const keyword = keywords[k];
      const sentenceKeyword = naturaliseKeyword(keyword);
      const values = { dish: dish, shop: shop, keyword: sentenceKeyword, fact: "" };
      for (let o = 0; o < openings.length && !fallback; o += 1) {
        const first = fill(openings[o], values);
        for (let q = 0; q < keywordLines.length && !fallback; q += 1) {
          const second = fill(keywordLines[q], values);
          const pair = first + " " + second;

          if (isUsable(pair, { shop: shop, dish: dish, keyword: sentenceKeyword })) {
            fallback = { review: pair, dish: dish, keywords: [keyword] };
            break;
          }

          for (let t = 0; t < thirdLines.length; t += 1) {
            let third = thirdLines[t];
            if (third.indexOf("{fact}") !== -1) {
              continue;
            }
            const candidate = pair + " " + third;
            if (isUsable(candidate, { shop: shop, dish: dish, keyword: sentenceKeyword })) {
              fallback = { review: candidate, dish: dish, keywords: [keyword] };
              break;
            }
          }
        }
      }
    }

    return fallback;
  }

  return {
    createFallbackReview: createFallbackReview,
    keywordFitsCategory: keywordFitsCategory,
    naturaliseKeyword: naturaliseKeyword,
    countWords: countWords,
    countSentences: countSentences,
    normalise: normalise,
  };
});
