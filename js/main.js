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

  function buildIndex() {
    var idx = [];
    UNITS.forEach(function (u) {
      idx.push({
        label: "Unit " + u.n + ": " + u.title, tag: "Unit · " + u.weight,
        dot: u.pastel, href: unitUrl(u.n), kw: u.title.toLowerCase()
      });
    });
    var u1 = UNITS[0].pastel;
    [
      ["c1", "What is a limit?", "limit definition approaches"],
      ["c2", "Estimating limits from tables & graphs", "estimate table graph numeric"],
      ["c3", "One-sided limits & when a limit fails to exist", "one-sided left right dne does not exist jump"],
      ["c4", "The limit laws", "limit laws sum product quotient algebra"],
      ["c5", "Evaluating limits algebraically", "evaluate substitution factor rationalize indeterminate complex fraction"],
      ["c6", "Special trig limits & the Squeeze Theorem", "sin x over x squeeze sandwich theorem trig"],
      ["c7", "Infinite limits & limits at infinity", "infinity asymptote vertical horizontal end behavior"],
      ["c8", "Continuity at a point", "continuity continuous discontinuity removable jump hole"],
      ["c9", "The Intermediate Value Theorem", "ivt intermediate value theorem root exists"]
    ].forEach(function (c) {
      idx.push({ label: c[1], tag: "Unit 1 · Concept", dot: u1, href: unitUrl(1) + "#" + c[0], kw: c[2] });
    });
    [
      ["x1", "Direct substitution", "substitution polynomial direct"],
      ["x2", "Estimating a limit from a table", "table estimate numeric"],
      ["x3", "Factoring a 0/0 form", "factor factoring zero over zero indeterminate"],
      ["x4", "Rationalizing a limit", "rationalize conjugate square root"],
      ["x5", "A complex fraction limit", "complex fraction common denominator"],
      ["x6", "One-sided limits & a jump", "jump piecewise one-sided discontinuity"],
      ["x7", "A limit that DNE (|x|/x)", "absolute value dne does not exist"],
      ["x8", "Squeeze Theorem", "squeeze sandwich oscillate cosine"],
      ["x9", "The sin x / x limit", "sin x over x trig special limit"],
      ["x10", "Infinite limit", "infinite vertical asymptote"],
      ["x11", "Limit at infinity (rational)", "infinity end behavior horizontal asymptote rational"],
      ["x12", "Limit at infinity with a root", "infinity square root horizontal asymptote"],
      ["x13", "Checking continuity at a point", "continuity removable hole"],
      ["x14", "Make a piecewise function continuous", "piecewise continuous solve constant"],
      ["x15", "Intermediate Value Theorem", "ivt root exists sign change"]
    ].forEach(function (e) {
      idx.push({ label: "Example: " + e[1], tag: "Unit 1 · Worked example", dot: u1, href: unitUrl(1) + "#" + e[0], kw: e[2] });
    });
    [
      ["Limits", "limit squeeze indeterminate continuity"],
      ["Derivative rules", "derivative power rule product rule quotient rule chain rule"],
      ["Common derivatives", "sin cos tan e^x ln natural log arctan trig"],
      ["Integral rules", "integral antiderivative integration accumulation"],
      ["The big theorems", "ftc fundamental theorem mvt mean value"],
      ["Good to memorize", "average value rate of change position velocity"]
    ].forEach(function (c) {
      idx.push({ label: c[0], tag: "Cheat Sheet", dot: "#f3c97a", href: url("resources/cheat-sheet.html"), kw: c[1] });
    });
    [
      ["Calculator policy", "calculator allowed sections when graphing policy no calculator"],
      ["What your calculator must do", "graph zeros solve derivative integral numerical calculator"],
      ["Calculator: smart habits & mistakes", "rounding radian mode setup decimals calculator tips"]
    ].forEach(function (c) {
      idx.push({ label: c[0], tag: "Calculator Guide", dot: "#cfe3b0", href: url("resources/calculator.html"), kw: c[1] });
    });
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
    idx.push({ label: "Official College Board practice", tag: "Practice", dot: "#f7c9c2", href: url("resources/practice.html"), kw: "college board official released free response frq exam practice apclassroom" });
    UNITS.forEach(function (u) {
      idx.push({
        label: "Practice — Unit " + u.n + ": " + u.title, tag: "Practice",
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

  // ----- boot --------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    renderMath();
  });
  window.addEventListener("load", openTarget);
  window.addEventListener("hashchange", openTarget);
})();
