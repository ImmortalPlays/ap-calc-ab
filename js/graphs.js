/* =========================================================================
   AP Calculus AB — interactive graph definitions (data)
   One entry per graph container id used across the unit & practice pages.
   Each builder receives the Desmos GraphingCalculator instance (c) and the
   Desmos namespace (D). The shared engine in main.js renders whichever of
   these appear on the current page. Data only — no page logic lives here.
   ========================================================================= */
(function () {
  "use strict";

  window.APCALC_GRAPHS = {

    // ---------- Unit 1: Limits & Continuity ----------
    "graph-hole": function (c, D) {
      c.setMathBounds({ left: -2, right: 6, bottom: -2, top: 8 });
      c.setExpression({ id: "l", latex: "y=x+2", color: D.Colors.BLUE });
      c.setExpression({ id: "h", latex: "(2,4)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
    },
    "graph-jump": function (c, D) {
      c.setMathBounds({ left: -2, right: 4, bottom: -1, top: 5 });
      c.setExpression({ id: "p1", latex: "y=x^2\\{x<1\\}", color: D.Colors.BLUE });
      c.setExpression({ id: "p2", latex: "y=x+1\\{x>1\\}", color: D.Colors.BLUE });
      c.setExpression({ id: "o", latex: "(1,1)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "cc", latex: "(1,2)", color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
    },
    "graph-abs": function (c, D) {
      c.setMathBounds({ left: -4, right: 4, bottom: -2.5, top: 2.5 });
      c.setExpression({ id: "f", latex: "y=\\frac{\\left|x\\right|}{x}", color: D.Colors.BLUE });
      c.setExpression({ id: "r", latex: "(0,1)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "l", latex: "(0,-1)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
    },
    "graph-squeeze": function (c, D) {
      c.setMathBounds({ left: -0.6, right: 0.6, bottom: -0.4, top: 0.4 });
      c.setExpression({ id: "f", latex: "y=x^2\\cos\\left(\\frac{1}{x}\\right)", color: D.Colors.BLUE });
      c.setExpression({ id: "u", latex: "y=x^2", color: "#888888", lineStyle: D.Styles.DASHED });
      c.setExpression({ id: "d", latex: "y=-x^2", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-sinx": function (c, D) {
      c.setMathBounds({ left: -10, right: 10, bottom: -0.5, top: 1.5 });
      c.setExpression({ id: "f", latex: "y=\\frac{\\sin x}{x}", color: D.Colors.BLUE });
      c.setExpression({ id: "p", latex: "(0,1)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
    },
    "graph-infinite": function (c, D) {
      c.setMathBounds({ left: -3, right: 7, bottom: -6, top: 6 });
      c.setExpression({ id: "f", latex: "y=1/(x-2)", color: D.Colors.BLUE });
      c.setExpression({ id: "va", latex: "x=2", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-atinfinity": function (c, D) {
      c.setMathBounds({ left: -12, right: 12, bottom: -1, top: 5 });
      c.setExpression({ id: "f", latex: "y=(3x^2+2)/(x^2+1)", color: D.Colors.BLUE });
      c.setExpression({ id: "ha", latex: "y=3", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-sqrt": function (c, D) {
      c.setMathBounds({ left: -10, right: 10, bottom: -2, top: 2 });
      c.setExpression({ id: "f", latex: "y=\\frac{x}{\\sqrt{x^2+1}}", color: D.Colors.BLUE });
      c.setExpression({ id: "h1", latex: "y=1", color: "#888888", lineStyle: D.Styles.DASHED });
      c.setExpression({ id: "h2", latex: "y=-1", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-continuity": function (c, D) {
      c.setMathBounds({ left: -4, right: 6, bottom: -3, top: 7 });
      c.setExpression({ id: "l", latex: "y=x+1", color: D.Colors.BLUE });
      c.setExpression({ id: "hole", latex: "(1,2)", pointStyle: D.Styles.OPEN, color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "def", latex: "(1,3)", color: D.Colors.RED, dragMode: D.DragModes.NONE, showLabel: true, label: "f(1)=3" });
    },
    "graph-ivt": function (c, D) {
      c.setMathBounds({ left: -1, right: 2, bottom: -3, top: 3 });
      c.setExpression({ id: "f", latex: "y=x^3+x-1", color: D.Colors.BLUE });
      c.setExpression({ id: "a", latex: "(0,-1)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "b", latex: "(1,1)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 2: Differentiation — Definition & Basic Rules ----------
    "graph-tangent": function (c, D) {
      c.setMathBounds({ left: -3, right: 4, bottom: -2, top: 6 });
      c.setExpression({ id: "f", latex: "y=x^2", color: D.Colors.BLUE });
      c.setExpression({ id: "t", latex: "y=2x-1", color: D.Colors.RED });
      c.setExpression({ id: "p", latex: "(1,1)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-corner": function (c, D) {
      c.setMathBounds({ left: -3, right: 3, bottom: -1, top: 3 });
      c.setExpression({ id: "f", latex: "y=\\left|x\\right|", color: D.Colors.BLUE });
      c.setExpression({ id: "p", latex: "(0,0)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 3: Composite, Implicit & Inverse Differentiation ----------
    "graph-implicit": function (c, D) {
      c.setMathBounds({ left: -8, right: 8, bottom: -7, top: 7 });
      c.setExpression({ id: "c", latex: "x^2+y^2=25", color: D.Colors.BLUE });
      c.setExpression({ id: "t", latex: "y-4=-0.75(x-3)", color: D.Colors.RED });
      c.setExpression({ id: "p", latex: "(3,4)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-inverse": function (c, D) {
      c.setMathBounds({ left: -1, right: 5, bottom: -1, top: 5 });
      c.setExpression({ id: "f", latex: "y=x^2\\left\\{x\\ge0\\right\\}", color: D.Colors.BLUE });
      c.setExpression({ id: "g", latex: "y=\\sqrt{x}", color: D.Colors.GREEN });
      c.setExpression({ id: "line", latex: "y=x", color: "#888888", lineStyle: D.Styles.DASHED });
      c.setExpression({ id: "p1", latex: "(2,4)", color: D.Colors.BLUE, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "p2", latex: "(4,2)", color: D.Colors.GREEN, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 4: Contextual Applications of Differentiation ----------
    "graph-motion": function (c, D) {
      c.setMathBounds({ left: -0.5, right: 4.5, bottom: -2, top: 6 });
      c.setExpression({ id: "s", latex: "y=x^3-6x^2+9x", color: D.Colors.BLUE });
      c.setExpression({ id: "p1", latex: "(1,4)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "p2", latex: "(3,0)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-linapprox": function (c, D) {
      c.setMathBounds({ left: 0, right: 9, bottom: -0.5, top: 3.5 });
      c.setExpression({ id: "f", latex: "y=\\sqrt{x}", color: D.Colors.BLUE });
      c.setExpression({ id: "t", latex: "y=2+0.25(x-4)", color: D.Colors.RED });
      c.setExpression({ id: "p", latex: "(4,2)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 5: Analytical Applications of Differentiation ----------
    "graph-extrema": function (c, D) {
      c.setMathBounds({ left: -3, right: 3, bottom: -4, top: 4 });
      c.setExpression({ id: "f", latex: "y=x^3-3x", color: D.Colors.BLUE });
      c.setExpression({ id: "mx", latex: "(-1,2)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "mn", latex: "(1,-2)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-mvt": function (c, D) {
      c.setMathBounds({ left: -0.5, right: 2.5, bottom: -1.5, top: 4.5 });
      c.setExpression({ id: "f", latex: "y=x^2", color: D.Colors.BLUE });
      c.setExpression({ id: "sec", latex: "y=2x", color: "#888888", lineStyle: D.Styles.DASHED });
      c.setExpression({ id: "tan", latex: "y=2x-1", color: D.Colors.RED });
      c.setExpression({ id: "p", latex: "(1,1)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-fprime": function (c, D) {
      c.setMathBounds({ left: -4, right: 4, bottom: -5, top: 5 });
      c.setExpression({ id: "fp", latex: "y=x^2-4", color: D.Colors.GREEN });
      c.setExpression({ id: "z1", latex: "(-2,0)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "z2", latex: "(2,0)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 6: Integration & Accumulation of Change ----------
    "graph-area": function (c, D) {
      c.setMathBounds({ left: -1, right: 4, bottom: -2, top: 14 });
      c.setExpression({ id: "f", latex: "y=3x^2", color: D.Colors.BLUE });
      c.setExpression({ id: "shade", latex: "0\\le y\\le3x^2\\left\\{0\\le x\\le2\\right\\}", color: D.Colors.BLUE, fillOpacity: 0.25, lines: false });
      c.setExpression({ id: "a", latex: "x=0", color: "#888888", lineStyle: D.Styles.DASHED });
      c.setExpression({ id: "b", latex: "x=2", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-net": function (c, D) {
      c.setMathBounds({ left: -1.6, right: 1.6, bottom: -1.6, top: 1.6 });
      c.setExpression({ id: "f", latex: "y=x^3", color: D.Colors.BLUE });
      c.setExpression({ id: "pos", latex: "0\\le y\\le x^3\\left\\{0\\le x\\le1\\right\\}", color: D.Colors.GREEN, fillOpacity: 0.3, lines: false });
      c.setExpression({ id: "neg", latex: "x^3\\le y\\le0\\left\\{-1\\le x\\le0\\right\\}", color: D.Colors.RED, fillOpacity: 0.3, lines: false });
    },

    // ---------- Unit 7: Differential Equations ----------
    "graph-growth": function (c, D) {
      c.setMathBounds({ left: -1, right: 8, bottom: -50, top: 1200 });
      c.setExpression({ id: "f", latex: "y=100e^{0.5x}", color: D.Colors.BLUE });
      c.setExpression({ id: "p", latex: "(0,100)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-decay": function (c, D) {
      c.setMathBounds({ left: -1, right: 10, bottom: -10, top: 120 });
      c.setExpression({ id: "f", latex: "y=100e^{-0.5x}", color: D.Colors.BLUE });
      c.setExpression({ id: "p", latex: "(0,100)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },

    // ---------- Unit 8: Applications of Integration ----------
    "graph-between": function (c, D) {
      c.setMathBounds({ left: -0.5, right: 1.5, bottom: -0.5, top: 1.5 });
      c.setExpression({ id: "l", latex: "y=x", color: D.Colors.BLUE });
      c.setExpression({ id: "p", latex: "y=x^2", color: D.Colors.GREEN });
      c.setExpression({ id: "shade", latex: "x^2\\le y\\le x\\left\\{0\\le x\\le1\\right\\}", color: D.Colors.PURPLE, fillOpacity: 0.3, lines: false });
    },
    "graph-washer": function (c, D) {
      c.setMathBounds({ left: -0.3, right: 1.4, bottom: -0.3, top: 1.4 });
      c.setExpression({ id: "o", latex: "y=\\sqrt{x}", color: D.Colors.BLUE });
      c.setExpression({ id: "i", latex: "y=x", color: D.Colors.RED });
      c.setExpression({ id: "shade", latex: "x\\le y\\le\\sqrt{x}\\left\\{0\\le x\\le1\\right\\}", color: D.Colors.PURPLE, fillOpacity: 0.3, lines: false });
    },

    // ---------- Practice Questions ----------
    "graph-p-u1": function (c, D) {
      c.setMathBounds({ left: -10, right: 10, bottom: -3, top: 7 });
      c.setExpression({ id: "f", latex: "y=\\frac{4x^2-3}{2x^2+x}", color: D.Colors.BLUE });
      c.setExpression({ id: "ha", latex: "y=2", color: "#888888", lineStyle: D.Styles.DASHED });
    },
    "graph-p-u2": function (c, D) {
      c.setMathBounds({ left: -2, right: 3, bottom: -4, top: 6 });
      c.setExpression({ id: "f", latex: "y=x^3", color: D.Colors.BLUE });
      c.setExpression({ id: "t", latex: "y=3x-2", color: D.Colors.RED });
      c.setExpression({ id: "p", latex: "(1,1)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-p-u5": function (c, D) {
      c.setMathBounds({ left: -3.5, right: 3.5, bottom: -20, top: 8 });
      c.setExpression({ id: "f", latex: "y=x^4-8x^2", color: D.Colors.BLUE });
      c.setExpression({ id: "mx", latex: "(0,0)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "m1", latex: "(-2,-16)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
      c.setExpression({ id: "m2", latex: "(2,-16)", color: D.Colors.RED, dragMode: D.DragModes.NONE });
    },
    "graph-p-u8": function (c, D) {
      c.setMathBounds({ left: -3, right: 3, bottom: -1, top: 5 });
      c.setExpression({ id: "f", latex: "y=4-x^2", color: D.Colors.BLUE });
      c.setExpression({ id: "shade", latex: "0\\le y\\le4-x^2\\left\\{-2\\le x\\le2\\right\\}", color: D.Colors.PURPLE, fillOpacity: 0.3, lines: false });
    }

  };
})();
