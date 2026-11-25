/*
 * PATASA · SHOP CONFIG
 * -----------------------------------------------------------------------------
 * This is the only file you need to edit to run the page.
 *
 * Do not put an API key, password or any private information in this file.
 * This file is public: it is downloaded by every visitor's browser.
 *
 * Edit only the text inside the "quotation marks". Keep the quotation marks,
 * commas and brackets exactly where they are. After saving, refresh the page
 * (when working locally) or redeploy (when the site is live).
 * -----------------------------------------------------------------------------
 */

const PATASA_CONFIG = {
  /*
   * 1. SETTINGS
   * ---------------------------------------------------------------------------
   * These are the shop details shown on the page and used by the button.
   *
   * HOW TO EDIT: Replace only the text between the quotation marks.
   * HOW TO ADD: There is nothing to add here. Every setting is already present.
   * HOW TO DELETE: Do not delete a setting line. Leave optional links as they
   * are if you do not have that page yet; those buttons stay hidden.
   *
   * Every link must start with https://
   * The Google review link is required for the "Copy & Post on Google" button.
   */
  settings: {
    shopName: "Patasa",

    // Shown under the shop name. You may edit this sentence.
    tagline: "Artisanal Mithai & Gelato · Nerul, Navi Mumbai",

    // Replace this with the full street address and pin code.
    address: "Nerul, Navi Mumbai, Maharashtra 400706",

    // REQUIRED. The page opens this link after copying the review.
    // It must start with https://. Set it to your website or Google review page.
    // Until you add it, the page shows a setup notice and the copy button stays disabled.
    googleReviewLink: "https://urbangrowlyst.in",

    // OPTIONAL. Paste the full page link, starting with https://
    instagram: "https://www.instagram.com/patasaofficial?utm_source=ig_web_button_share_sheet&gwpx=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/patasaofficial/",

    // OPTIONAL. Use a full wa.me link with the country code, for example:
    // "https://wa.me/919876543210"
    whatsapp: "PASTE YOUR WHATSAPP LINK HERE",

    // OPTIONAL. Your website home page, starting with https://
    website: "PASTE YOUR WEBSITE LINK HERE",
  },

  /*
   * 2. DISHES
   * ---------------------------------------------------------------------------
   * The AI picks ONE of these dishes for each review.
   *
   * category must be exactly "Gelatos", "Mithai" or "Cakes".
   * enabled: true  -> the dish can appear in reviews.
   * enabled: false -> the dish is hidden, but kept in this list.
   *
   * HOW TO ADD A DISH: Copy one { ... } block, paste it below, add a comma
   * between blocks, then change the name and category.
   * HOW TO EDIT: Change the text between the quotation marks.
   * HOW TO DELETE: Remove the whole { ... } block and the comma after it.
   */
  dishes: [
    { name: "coconut-mango mithai", category: "Mithai", enabled: true },
    { name: "hazelnut mithai", category: "Mithai", enabled: true },
    { name: "gulab mithai", category: "Mithai", enabled: true },
    { name: "Snickers mithai", category: "Mithai", enabled: true },
    { name: "artisanal mithai box", category: "Mithai", enabled: true },
    { name: "bonbon box", category: "Cakes", enabled: true },
    { name: "gelato", category: "Gelatos", enabled: true },
    { name: "festive hamper", category: "Mithai", enabled: true },
  ],

  /*
   * 3. SEO KEYWORDS
   * ---------------------------------------------------------------------------
   * The AI weaves ONE of these phrases into each review, exactly as written.
   * Keep them natural and relevant. Do not add dozens of near-identical phrases.
   *
   * HOW TO ADD: Add a new line inside the [ ... ] list, wrapped in quotes, and
   * put a comma at the end of the line above it.
   * HOW TO EDIT: Change the text inside the quotes.
   * HOW TO DELETE: Remove the whole line, including its comma.
   * You need at least one keyword. Ten to twenty is plenty.
   */
  seoKeywords: [
    "best mithai in Nerul",
    "eggless sweets Navi Mumbai",
    "artisanal mithai Nerul",
    "gelato in Nerul",
    "cakes in Nerul",
    "Diwali gift hampers Navi Mumbai",
    "preservative-free mithai",
    "best gelato in Nerul",
    "eggless gelato Navi Mumbai",
    "artisanal gelato Nerul",
    "eggless cakes Nerul",
    "mithai shop in Nerul",
    "best sweets in Nerul",
    "sweets shop in Nerul",
    "Nerul sweet shop",
    "eggless mithai Nerul",
    "mithai gifts Navi Mumbai",
    "Diwali sweets Navi Mumbai",
  ],

  /*
   * 4. SHOP FACTS
   * ---------------------------------------------------------------------------
   * True claims the AI is allowed to mention. Do not add prices, awards,
   * staff names or anything you cannot verify.
   *
   * HOW TO ADD: Add a new line inside the [ ... ] list, wrapped in quotes, and
   * put a comma at the end of the line above it.
   * HOW TO EDIT: Change the text inside the quotes.
   * HOW TO DELETE: Remove the whole line, including its comma.
   * This list can be empty, but reviews are stronger with two or three facts.
   */
  shopFacts: [
    "100% eggless",
    "preservative-free",
    "gifting boxes",
  ],
};

/*
 * -----------------------------------------------------------------------------
 * Do not edit anything below this line.
 * It makes the same file work in the browser and on the server.
 * -----------------------------------------------------------------------------
 */
if (typeof window !== "undefined") {
  window.PATASA_CONFIG = PATASA_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = PATASA_CONFIG;
}
