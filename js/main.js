// Render all the KaTeX math on the page once it has loaded.
// We look for \( ... \) for inline math and $$ ... $$ for display math.
document.addEventListener("DOMContentLoaded", function () {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }
});
