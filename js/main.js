/* =========================================================================
   AP Calculus AB — shared chrome
   Builds the sidebar + search on every page, renders KaTeX, and handles
   "jump to a concept / worked example" via URL hash links.
   ========================================================================= */
(function () {
  "use strict";

  // ----- data --------------------------------------------------------------

  var UNITS = [
    { n: 1, title: "Limits & Continuity",                              weight: "10–12%", pastel: "#f7c9c2", deep: "#cf7d72" },
    { n: 2, title: "Differentiation: Definition & Basic Rules",        weight: "10–12%", pastel: "#f8d9b8", deep: "#cf9450" },
    { n: 3, title: "Composite, Implicit & Inverse Differentiation",    weight: "9–13%",  pastel: "#f5e6a6", deep: "#bb9a34" },
    { n: 4, title: "Contextual Applications of Differentiation",       weight: "10–15%", pastel: "#cfe3b0", deep: "#7c9c4e" },
    { n: 5, title: "Analytical Applications of Differentiation",       weight: "15–18%", pastel: "#bbe3d0", deep: "#4c9e78" },
    { n: 6, title: "Integration & Accumulation of Change",             weight: "17–20%", pastel: "#bcdcec", deep: "#4e8db8" },
    { n: 7, title: "Differential Equations",                           weight: "6–12%",  pastel: "#c6cdf0", deep: "#6a73c4" },
    { n: 8, title: "Applications of Integration",                      weight: "10–15%", pastel: "#e2c9ec", deep: "#9d6cbb" }
  ];

  var body = document.body;
  var BASE = body.getAttribute("data-base") || "";
  var PAGE = body.getAttribute("data-page") || "home";       // home | unit | cheat | calc | faq
  var ACTIVE_UNIT = parseInt(body.getAttribute("data-unit"), 10) || 0;

  function url(path) { return BASE + path; }
  function unitUrl(n) { return url("units/unit-" + n + ".html"); }

  // ----- search index ------------------------------------------------------

  // Every unit's concepts and worked examples, in page order. The concept
  // index (c1, c2, …) is assigned to each unit page's ".concept h2" at load,
  // and example <span> ids (x1, x2, …) already live in the markup — so these
  // entries jump straight to the exact lesson via a #hash link.
  var CONTENT = {
    1: {
      concepts: ["What is a limit?", "Estimating limits from tables & graphs", "One-sided limits & when a limit fails to exist", "The limit laws", "Evaluating limits algebraically", "Special trig limits & the Squeeze Theorem", "Infinite limits & limits at infinity", "Continuity at a point", "The Intermediate Value Theorem"],
      examples: ["Direct substitution", "Estimating a limit from a table", "Factoring a 0/0 form", "Rationalizing a limit", "A complex fraction limit", "One-sided limits & a jump", "A limit that DNE (|x|/x)", "Squeeze Theorem", "The sin x / x limit", "Infinite limit", "Limit at infinity (rational)", "Limit at infinity with a root", "Checking continuity at a point", "Make a piecewise function continuous", "Intermediate Value Theorem"]
    },
    2: {
      concepts: ["What is a derivative?", "Notation & the derivative as a function", "Differentiability vs. continuity", "The power rule & combinations", "Derivatives worth memorizing", "The product rule", "The quotient rule", "Higher-order derivatives", "Spotting a derivative in disguise"],
      examples: ["Derivative from the limit definition (x²)", "Limit definition with a fraction (1/x)", "Power rule", "Rewrite roots & fractions first", "Product rule", "Quotient rule", "Deriving d/dx tan x", "Tangent line", "Where a derivative fails to exist (|x|)", "A limit that's secretly a derivative"]
    },
    3: {
      concepts: ["The chain rule", "Chain rule with the common functions", "Nested chain rule", "Implicit differentiation", "Tangent lines on implicit curves", "Derivatives of inverse functions", "Inverse-trig derivatives", "Logarithmic differentiation & other bases"],
      examples: ["Chain rule (3x²+1)⁵", "Chain rule with trig & exponentials", "Nested chain rule", "Implicit differentiation (x²+y²=25)", "Implicit with a product term", "Inverse trig + chain rule", "Derivative of an inverse at a point", "Inverses as reflections", "Logarithmic differentiation (xˣ)", "A different base (5ˣ)"]
    },
    4: {
      concepts: ["Motion along a line", "Speeding up vs. slowing down", "Rates of change in context", "Related rates", "L'Hôpital's Rule", "Linear approximation", "Geometry formulas for related rates"],
      examples: ["Motion (s = t³−6t²+9t)", "Speeding up or slowing down?", "Related rates: inflating balloon", "Related rates: sliding ladder", "L'Hôpital (0/0)", "L'Hôpital (∞/∞)", "Linear approximation of √4.1", "Related rates: draining cone"]
    },
    5: {
      concepts: ["Increasing, decreasing & critical points", "First derivative test", "Concavity & the second derivative", "Inflection points", "Second derivative test", "Absolute extrema on a closed interval", "The Mean Value Theorem", "Curve sketching", "Reading f, f', f'' together"],
      examples: ["Local extrema of x³−3x", "Concavity & inflection", "Second derivative test", "Absolute extrema on [0,3]", "Optimization: rectangle, perimeter 20", "Optimization: fencing against a wall", "Mean Value Theorem", "Reading a graph of f'"]
    },
    6: {
      concepts: ["Antiderivatives & the indefinite integral", "Basic antiderivative rules", "Riemann sums", "The definite integral as signed area", "FTC Part 1 (accumulation)", "FTC Part 2 (evaluation)", "u-substitution", "Average value of a function"],
      examples: ["Indefinite integral", "Antiderivatives with trig & eˣ", "Left Riemann sum from a table", "Definite integral via FTC", "Signed area", "FTC Part 1 with the chain rule", "u-substitution (indefinite)", "u-substitution (definite)", "Average value", "Trapezoidal estimate from a table"]
    },
    7: {
      concepts: ["What is a differential equation?", "Slope fields", "Separable equations", "Initial value problems", "Exponential growth & decay", "Half-life & doubling", "Newton's Law of Cooling"],
      examples: ["Verify a solution", "Separable equation (dy/dx = xy)", "Initial value problem", "Exponential growth", "Exponential decay", "Half-life", "Newton's cooling"]
    },
    8: {
      concepts: ["Area under a curve", "Area between two curves (in x)", "Area integrating in y", "Volume by disks", "Volume by washers", "Volume by known cross-sections", "Average value", "Motion: displacement vs. distance"],
      examples: ["Area between y=x and y=x²", "Area needing intersection points", "Average value", "Volume by disks", "Volume by washers", "Known cross-sections (squares)", "Displacement vs. total distance", "Cross-sections: equilateral triangles", "Integrating in y"]
    }
  };

  function buildIndex() {
    var idx = [];

    // Units, with all their concepts and worked examples.
    UNITS.forEach(function (u) {
      idx.push({
        label: "Unit " + u.n + ": " + u.title, tag: "Unit · " + u.weight,
        dot: u.pastel, href: unitUrl(u.n), kw: u.title.toLowerCase()
      });
      var c = CONTENT[u.n];
      if (!c) return;
      c.concepts.forEach(function (title, i) {
        idx.push({
          label: title, tag: "Unit " + u.n + " · Concept", dot: u.pastel,
          href: unitUrl(u.n) + "#c" + (i + 1), kw: title.toLowerCase()
        });
      });
      c.examples.forEach(function (title, i) {
        idx.push({
          label: title, tag: "Unit " + u.n + " · Example", dot: u.pastel,
          href: unitUrl(u.n) + "#x" + (i + 1), kw: "example " + title.toLowerCase()
        });
      });
    });

    // Cheat sheet — one entry per unit section + exam structure.
    UNITS.forEach(function (u) {
      idx.push({
        label: "Cheat Sheet — Unit " + u.n + " formulas", tag: "Cheat Sheet",
        dot: "#f3c97a", href: url("resources/cheat-sheet.html") + "#u" + u.n,
        kw: "cheat sheet formulas reference " + u.title.toLowerCase()
      });
    });
    idx.push({ label: "Cheat Sheet — exam structure", tag: "Cheat Sheet", dot: "#f3c97a", href: url("resources/cheat-sheet.html") + "#exam", kw: "exam structure sections multiple choice free response timing" });

    // Calculator guide.
    [
      ["When can you use a calculator?", "calculator allowed sections policy no calculator parts"],
      ["TI-84: know your keys", "ti-84 keys y= window zoom graph calc math menu"],
      ["TI-84: graphing a function", "graph function ti-84 window zoom trace radian mode"],
      ["TI-84: zeros, intersect, dy/dx, integrals", "zero intersect derivative dy dx definite integral fnint nderiv"]
    ].forEach(function (c) {
      idx.push({ label: c[0], tag: "Calculator Guide", dot: "#cfe3b0", href: url("resources/calculator.html"), kw: c[1] });
    });

    // FAQ.
    [
      ["FAQ: What score do I need?", "score passing 3 4 5 credit college qualified"],
      ["FAQ: How is the exam scored?", "scoring composite multiple choice free response"],
      ["FAQ: AB vs BC", "ab bc difference series"],
      ["FAQ: How long & when?", "length time may date how long when"],
      ["FAQ: Do I need to memorize formulas?", "memorize formula sheet formulas"],
      ["FAQ: What to bring on exam day", "exam day bring calculator id batteries pencil"]
    ].forEach(function (c) {
      idx.push({ label: c[0], tag: "FAQ", dot: "#c6cdf0", href: url("resources/faq.html"), kw: c[1] });
    });

    // Practice.
    idx.push({ label: "Official College Board practice", tag: "Practice", dot: "#f7c9c2", href: url("resources/practice.html"), kw: "college board official released free response frq exam practice apclassroom" });
    UNITS.forEach(function (u) {
      idx.push({
        label: "Practice — Unit " + u.n, tag: "Practice",
        dot: u.pastel, href: url("resources/practice.html") + "#u" + u.n,
        kw: "practice problems questions exam " + u.title.toLowerCase()
      });
    });
    return idx;
  }

  var INDEX = buildIndex();

  // ----- sidebar -----------------------------------------------------------

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function buildSidebar() {
    var aside = document.getElementById("sidebar");
    if (!aside) return;
    aside.className = "sidebar";

    // logo
    var logo = el("a", "sb-logo");
    logo.href = url("index.html");
    logo.innerHTML =
      '<span class="sb-logo-glyph">∫</span>' +
      '<span class="sb-logo-text"><b>AP Calc AB</b><span>Study Guide</span></span>';
    aside.appendChild(logo);

    // search
    var sw = el("div", "sb-search-wrap");
    sw.innerHTML =
      '<input class="sb-search" type="text" placeholder="Search lessons & concepts…" ' +
      'autocomplete="off" spellcheck="false">' +
      '<span class="sb-search-icon">⌕</span>';
    aside.appendChild(sw);

    var resultsBox = el("div");
    aside.appendChild(resultsBox);

    // units
    aside.appendChild(el("div", "sb-section-label", "UNITS"));
    var unav = el("div", "sb-nav");
    UNITS.forEach(function (u) {
      var row = el("a", "sb-row" + (PAGE === "unit" && ACTIVE_UNIT === u.n ? " active" : ""));
      row.href = unitUrl(u.n);
      if (PAGE === "unit" && ACTIVE_UNIT === u.n) row.style.setProperty("--row-bg", u.pastel);
      row.innerHTML =
        '<span class="dot" style="background:' + u.pastel + '"></span>' +
        '<span class="num">' + u.n + '</span>' +
        '<span class="title">' + u.title + '</span>';
      unav.appendChild(row);
    });
    aside.appendChild(unav);

    // resources
    aside.appendChild(el("div", "sb-section-label spaced", "RESOURCES"));
    var rnav = el("div", "sb-nav");
    var res = [
      { key: "practice", label: "Practice",        sq: "#f7c9c2", href: url("resources/practice.html"),    bg: "#fbe0db" },
      { key: "cheat",    label: "Cheat Sheet",      sq: "#f3c97a", href: url("resources/cheat-sheet.html"), bg: "#f7e7c4" },
      { key: "calc",     label: "Calculator Guide", sq: "#cfe3b0", href: url("resources/calculator.html"),  bg: "#d9ebc2" },
      { key: "faq",      label: "FAQ",              sq: "#c6cdf0", href: url("resources/faq.html"),          bg: "#d6dcf5" }
    ];
    res.forEach(function (r) {
      var row = el("a", "sb-row" + (PAGE === r.key ? " active" : ""));
      row.href = r.href;
      if (PAGE === r.key) row.style.setProperty("--row-bg", r.bg);
      row.innerHTML = '<span class="sq" style="background:' + r.sq + '"></span>' +
        '<span class="title">' + r.label + '</span>';
      rnav.appendChild(row);
    });
    aside.appendChild(rnav);

    // exam card
    var exam = el("div", "sb-exam-card");
    exam.innerHTML = "<b>Exam in May</b><span>3 hr 15 min · MC + Free Response, each worth half.</span>";
    aside.appendChild(exam);

    wireSearch(sw.querySelector(".sb-search"), resultsBox);
  }

  // ----- search behaviour --------------------------------------------------

  function wireSearch(input, box) {
    var current = [];

    function render(q) {
      box.innerHTML = "";
      current = [];
      var query = (q || "").trim().toLowerCase();
      if (!query) return;

      // clear button
      var clear = el("button", "sb-search-clear", "✕");
      clear.type = "button";
      clear.addEventListener("click", function () { input.value = ""; render(""); input.focus(); });
      input.parentNode.appendChild(clear);

      current = INDEX.filter(function (r) {
        return r.label.toLowerCase().indexOf(query) > -1 || r.kw.indexOf(query) > -1;
      }).slice(0, 8);

      var panel = el("div", "sb-results");
      if (current.length === 0) {
        panel.appendChild(el("div", "sb-noresults",
          "No matches. Try <em>limit</em>, <em>chain rule</em>, or <em>integral</em>."));
      } else {
        current.forEach(function (r) {
          var a = el("a", "sb-result");
          a.href = r.href;
          a.innerHTML =
            '<span class="dot" style="background:' + r.dot + '"></span>' +
            '<span class="txt"><span class="lbl">' + r.label + '</span>' +
            '<span class="tag">' + r.tag + '</span></span>';
          panel.appendChild(a);
        });
      }
      box.appendChild(panel);
    }

    function clearBtn() {
      var b = input.parentNode.querySelector(".sb-search-clear");
      if (b) b.parentNode.removeChild(b);
    }

    input.addEventListener("input", function () { clearBtn(); render(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && current.length) { window.location.href = current[0].href; }
      else if (e.key === "Escape") { input.value = ""; clearBtn(); render(""); }
    });
  }

  // ----- KaTeX -------------------------------------------------------------

  function renderMath() {
    if (window.renderMathInElement) {
      try {
        renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    } else {
      renderMath._t = (renderMath._t || 0) + 1;
      if (renderMath._t < 60) setTimeout(renderMath, 150);
    }
  }

  // ----- jump to a hash target (concept / worked example) ------------------

  function openTarget() {
    var id = (window.location.hash || "").replace(/^#/, "");
    if (!id) return;
    var node = document.getElementById(id);
    if (!node) return;
    var det = node.tagName === "DETAILS" ? node : node.closest("details");
    if (det && !det.open) det.open = true;   // fires 'toggle' -> Desmos resize
    // let layout settle (KaTeX + any graph) before scrolling
    setTimeout(function () {
      var y = node.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 60);
  }

  // ----- floating graphing-calculator widget ------------------------------

  var DESMOS_SRC = "https://www.desmos.com/api/v1.9/calculator.js?apiKey=05a281a9888d40d784b1b7c4f6497abd";

  function buildCalcWidget() {
    // Floating button
    var fab = el("button", "calc-fab");
    fab.type = "button";
    fab.setAttribute("aria-label", "Open graphing calculator");
    fab.innerHTML =
      '<span class="calc-fab-label">Graphing calculator</span>' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 4 V20 H20"/><path d="M4 16 C 8 16, 9 7, 13 7 S 18 11, 20 6"/></svg>';

    // Panel
    var panel = el("div", "calc-panel");
    panel.innerHTML =
      '<div class="calc-panel-head">' +
        '<span class="calc-panel-title">Graphing Calculator</span>' +
        '<button type="button" class="calc-panel-close" aria-label="Close calculator">✕</button>' +
      '</div>' +
      '<div class="calc-panel-body" id="calc-widget-graph">' +
        '<div class="calc-panel-loading">Loading…</div>' +
      '</div>';

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    var calc = null, loading = false;

    var STORAGE_KEY = "apcalc-graph-state";

    function makeCalc() {
      var graphEl = document.getElementById("calc-widget-graph");
      graphEl.innerHTML = "";
      calc = window.Desmos.GraphingCalculator(graphEl, { border: false });

      // Restore anything the student saved last time.
      try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) calc.setState(JSON.parse(saved));
      } catch (e) {}

      // Persist on change (debounced — panning/zoom fire often).
      var saveTimer = null;
      calc.observeEvent("change", function () {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(calc.getState())); } catch (e) {}
        }, 400);
      });
    }

    function ensureCalc() {
      if (calc) { calc.resize(); return; }
      if (window.Desmos) { makeCalc(); return; }
      if (loading) return;
      loading = true;
      var s = document.createElement("script");
      s.src = DESMOS_SRC;
      s.onload = function () { if (panel.classList.contains("open")) makeCalc(); };
      document.head.appendChild(s);
    }

    function open() { panel.classList.add("open"); fab.classList.add("active"); ensureCalc(); }
    function close() { panel.classList.remove("open"); fab.classList.remove("active"); }

    fab.addEventListener("click", function () {
      if (panel.classList.contains("open")) close(); else open();
    });
    panel.querySelector(".calc-panel-close").addEventListener("click", close);

    // Drag the panel around by its header.
    var head = panel.querySelector(".calc-panel-head");
    var dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
    head.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".calc-panel-close")) return;   // let the close button work
      var r = panel.getBoundingClientRect();
      // pin to left/top so we can move freely (it starts anchored bottom-right)
      panel.style.left = r.left + "px";
      panel.style.top = r.top + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      dragging = true;
      startX = e.clientX; startY = e.clientY; startLeft = r.left; startTop = r.top;
      panel.classList.add("dragging");
      head.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    head.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var nx = startLeft + (e.clientX - startX);
      var ny = startTop + (e.clientY - startY);
      var maxX = window.innerWidth - panel.offsetWidth;
      var maxY = window.innerHeight - panel.offsetHeight;
      panel.style.left = Math.max(0, Math.min(nx, maxX)) + "px";
      panel.style.top = Math.max(0, Math.min(ny, maxY)) + "px";
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove("dragging");
      try { head.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    head.addEventListener("pointerup", endDrag);
    head.addEventListener("pointercancel", endDrag);
  }

  // Give each concept heading on a unit page a stable id (c1, c2, …) so
  // search results can deep-link to a specific concept.
  function tagConcepts() {
    if (PAGE !== "unit") return;
    var heads = document.querySelectorAll(".concept h2");
    for (var i = 0; i < heads.length; i++) {
      if (!heads[i].id) heads[i].id = "c" + (i + 1);
    }
  }

  // ----- boot --------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    tagConcepts();
    buildCalcWidget();
    renderMath();
  });
  window.addEventListener("load", openTarget);
  window.addEventListener("hashchange", openTarget);
})();
