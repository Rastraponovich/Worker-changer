(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 837:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_y": function() { return /* binding */ Context; },
/* harmony export */   "cf": function() { return /* binding */ ThingsProvider; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const footer = {
  light: {
    backgroundColor: "transparent",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    color: " #000"
  },
  dark: {
    backgroundColor: "#293048",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    color: " #fff"
  }
};
const header = {
  light: {
    display: "flex",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    color: "#000",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dark: {
    display: "flex",
    color: "#fff",
    padding: "1rem 2rem",
    backgroundColor: "#293048",
    justifyContent: "space-between",
    alignItems: "center"
  }
};
const body = {
  light: {},
  dark: {}
};
const theme = {
  mode: "dark",
  light: {
    bg: "#fff",
    palette: {},
    footer: footer.light,
    header: header.light,
    body: body.light,
    title: {}
  },
  dark: {
    bg: "#000",
    palette: {},
    title: {},
    footer: footer.dark,
    header: header.dark,
    body: body.dark
  }
};
const Context = {
  theme: theme[theme.mode],
  mode: theme.mode,
  toggleTheme: () => {
    theme.mode = theme.mode === "dark" ? "light" : "dark";
    Context.mode = theme.mode;
    Context.theme = theme[theme.mode];
  }
};
const ThingsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(Context);
const ThingsProvider = ThingsContext.Provider;
/* harmony default export */ __webpack_exports__["ZP"] = (ThingsContext);

/***/ }),

/***/ 421:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(554);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App_ThingsContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(837);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function MyApp({
  Component,
  pageProps
}) {
  return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_App_ThingsContext__WEBPACK_IMPORTED_MODULE_1__/* .ThingsProvider */ .cf, {
    value: _components_App_ThingsContext__WEBPACK_IMPORTED_MODULE_1__/* .Context */ ._y,
    children: _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, _objectSpread({}, pageProps))
  });
}

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ 554:
/***/ (function(module) {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");;

/***/ }),

/***/ 297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(421));
module.exports = __webpack_exports__;

})();