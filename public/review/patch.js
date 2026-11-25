const fs = require("fs");
const p = "app.js";
let s = fs.readFileSync(p, "utf8");
const start = s.indexOf("  async function requestReview() {");
const endMarker = "  }\n\n  async function copyToClipboard(text) {";
const end = s.indexOf(endMarker, start);
if (start === -1 || end === -1) { console.error("markers not found", start, end); process.exit(1); }
const replacement = `  async function requestReview() {
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
      setStatus("Writing a fresh review\\u2026");
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

`;
s = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync(p, s, "utf8");
console.log("done");
