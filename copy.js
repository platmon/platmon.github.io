// Adds a copy button to every command block.
(() => {
  "use strict";
  const labels = {
    en: { copy: "Copy", copied: "Copied", failed: "Copy failed" },
    ko: { copy: "복사", copied: "복사됨", failed: "복사 실패" },
  };
  const text = (key) => (labels[document.documentElement.lang] || labels.en)[key];

  async function writeText(value) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch { /* Fall back for browsers without the async clipboard. */ }
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    if (!ok) throw new Error("copy failed");
  }

  const buttons = [];
  document.querySelectorAll("pre > code").forEach((code) => {
    const pre = code.parentElement;
    const block = document.createElement("div");
    block.className = "command";
    pre.replaceWith(block);
    block.append(pre);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy";
    button.textContent = text("copy");
    let timer;
    button.addEventListener("click", async () => {
      let state = "copied";
      try { await writeText(code.textContent); } catch { state = "failed"; }
      button.textContent = text(state);
      button.dataset.state = state;
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.textContent = text("copy");
        delete button.dataset.state;
      }, 2000);
    });
    block.append(button);
    buttons.push(button);
  });

  // Follow the language switch on the home page.
  new MutationObserver(() => {
    buttons.forEach((button) => { if (!button.dataset.state) button.textContent = text("copy"); });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
