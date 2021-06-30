(function() {
var exports = {};
exports.id = 405;
exports.ids = [405];
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

/***/ 900:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "$": function() { return /* binding */ sendData; }
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "https"
var external_https_namespaceObject = require("https");;
;// CONCATENATED MODULE: ./hooks/useGetData.ts


const credentials = {
  username: process.env.RK7_LOGIN,
  password: process.env.RK7_PASSWORD
};
const agent = new external_https_namespaceObject.Agent({
  rejectUnauthorized: false,
  secureProtocol: "TLSv1_method"
});
const sendData = async xmlQuery => {
  try {
    const URL = process.env.RK7_URL;
    const request = await external_axios_default().post(URL, xmlQuery, {
      httpsAgent: agent,
      auth: credentials,
      timeout: 3000,
      headers: {
        "Content-Type": "text/xml"
      }
    });
    return {
      error: false,
      data: request.data
    };
  } catch (error) {
    const {
      isAxiosError,
      code
    } = error;
    return {
      error: true,
      isAxiosError,
      code
    };
  }
};

/***/ }),

/***/ 911:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "S": function() { return /* binding */ useParser; }
});

;// CONCATENATED MODULE: external "fast-xml-parser"
var external_fast_xml_parser_namespaceObject = require("fast-xml-parser");;
;// CONCATENATED MODULE: external "he"
var external_he_namespaceObject = require("he");;
var external_he_default = /*#__PURE__*/__webpack_require__.n(external_he_namespaceObject);
;// CONCATENATED MODULE: ./hooks/usePareser.ts


const arrayObjOptions = {
  attributeNamePrefix: "",
  textNodeName: "#text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: "__cdata",
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: true,
  attrValueProcessor: (val, attrName) => external_he_default().decode(val, {
    isAttributeValue: true
  }),
  //default is a=>a
  tagValueProcessor: (val, tagName) => external_he_default().decode(val),
  //default is a=>a
  stopNodes: ["parse-me-as-string"]
};
const useParser = xmlData => {
  let jsonObj = {};

  if (external_fast_xml_parser_namespaceObject.validate(xmlData) === true) {
    jsonObj = external_fast_xml_parser_namespaceObject.parse(xmlData, arrayObjOptions);
  }

  return jsonObj;
};

/***/ }),

/***/ 617:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ pages; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(554);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "next/router"
var router_namespaceObject = require("next/router");;
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./hooks/usePareser.ts + 2 modules
var usePareser = __webpack_require__(911);
// EXTERNAL MODULE: ./hooks/useGetData.ts + 1 modules
var useGetData = __webpack_require__(900);
;// CONCATENATED MODULE: external "next/head"
var head_namespaceObject = require("next/head");;
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(644);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: ./styles/Header.module.css
var Header_module = __webpack_require__(514);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
;// CONCATENATED MODULE: ./components/Header/HeaderStatusIndicator.tsx





const HeaderStatusIndicator = ({
  state,
  styles
}) => {
  return jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: state ? (0,jsx_runtime_.jsxs)("div", {
      className: styles.statusBlock,
      children: [jsx_runtime_.jsx("span", {
        children: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442"
      }), jsx_runtime_.jsx("span", {
        className: styles.circleActive
      })]
    }) : (0,jsx_runtime_.jsxs)("div", {
      className: styles.statusBlock,
      children: [jsx_runtime_.jsx("span", {
        children: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442"
      }), jsx_runtime_.jsx("span", {
        className: styles.circleInActive
      })]
    })
  });
};

/* harmony default export */ var Header_HeaderStatusIndicator = (/*#__PURE__*/(0,external_react_.memo)(HeaderStatusIndicator));
// EXTERNAL MODULE: ./components/App/ThingsContext.tsx
var ThingsContext = __webpack_require__(837);
;// CONCATENATED MODULE: ./components/Header/Header.tsx







const Header = ({
  serverState
}) => {
  const context = (0,external_react_.useContext)(ThingsContext/* default */.ZP);
  return (0,jsx_runtime_.jsxs)("header", {
    style: context.theme.header,
    children: [jsx_runtime_.jsx("a", {
      href: "/",
      className: (Header_module_default()).title,
      children: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043A\u0430\u0441\u0441\u0438\u0440\u043E\u0432"
    }), jsx_runtime_.jsx("div", {
      className: "bulk"
    }), jsx_runtime_.jsx(Header_HeaderStatusIndicator, {
      state: serverState,
      styles: (Header_module_default())
    })]
  });
};

/* harmony default export */ var Header_Header = (/*#__PURE__*/(0,external_react_.memo)(Header));
;// CONCATENATED MODULE: ./components/Footer/Footer.tsx





const Footer = ({
  status
}) => {
  const {
    0: time,
    1: setTime
  } = (0,external_react_.useState)("");
  const context = (0,external_react_.useContext)(ThingsContext/* default */.ZP);
  (0,external_react_.useEffect)(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleString());
    }, 1000);
  }, [status]);
  return (0,jsx_runtime_.jsxs)("footer", {
    style: context.theme.footer,
    children: [(0,jsx_runtime_.jsxs)("span", {
      children: ["\u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ", status.ServerVersion]
    }), (0,jsx_runtime_.jsxs)("span", {
      children: ["\u0418\u043C\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ", status.NetName]
    }), jsx_runtime_.jsx("span", {
      children: time
    })]
  });
};

/* harmony default export */ var Footer_Footer = (/*#__PURE__*/(0,external_react_.memo)(Footer));
;// CONCATENATED MODULE: ./components/Layout/Layout.tsx








const Layout = ({
  serverState,
  children,
  status
}) => {
  return (0,jsx_runtime_.jsxs)("div", {
    className: (Home_module_default()).wrapper,
    children: [(0,jsx_runtime_.jsxs)((head_default()), {
      children: [jsx_runtime_.jsx("title", {
        children: "WorkerChanger"
      }), jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      })]
    }), jsx_runtime_.jsx(Header_Header, {
      serverState: serverState
    }), jsx_runtime_.jsx("div", {
      className: (Home_module_default()).container,
      children: jsx_runtime_.jsx("main", {
        className: (Home_module_default()).main,
        children: children
      })
    }), jsx_runtime_.jsx(Footer_Footer, {
      status: status
    })]
  });
};

/* harmony default export */ var Layout_Layout = (/*#__PURE__*/(0,external_react_.memo)(Layout));
;// CONCATENATED MODULE: ./components/Modal/Modal.tsx





const Modal = ({
  children,
  show,
  onClose,
  autoClose
}) => {
  const {
    0: open,
    1: setOpen
  } = (0,external_react_.useState)(show);
  (0,external_react_.useEffect)(() => {
    if (autoClose) {
      setOpen(show);
      setTimeout(() => {
        setOpen(!show);
      }, autoClose);
    } else {
      setOpen(show);
    }
  }, [show]); // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault()
  //     onClose()
  // }

  const handleClose = event => {
    // event.preventDefault()
    event.stopPropagation();
    onClose();
  };

  return (0,jsx_runtime_.jsxs)("div", {
    className: (Home_module_default()).modal,
    style: {
      display: !open ? "none" : "inherit"
    },
    onClick: handleClose,
    children: [jsx_runtime_.jsx("div", {
      className: (Home_module_default()).modalWrapper
    }), jsx_runtime_.jsx("div", {
      className: (Home_module_default()).modalTextBlock,
      children: children
    })]
  });
};

/* harmony default export */ var Modal_Modal = (Modal);
;// CONCATENATED MODULE: ./components/InfoBlock/InfoBlock.tsx




const InfoBlock = ({
  styles,
  show
}) => {
  return jsx_runtime_.jsx("section", {
    children: show ? (0,jsx_runtime_.jsxs)("ul", {
      className: styles.info,
      children: [jsx_runtime_.jsx("li", {
        children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0441\u0441\u0438\u0440\u0430 \u0438\u0437 \u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0435\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430"
      }), jsx_runtime_.jsx("li", {
        children: "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
      }), jsx_runtime_.jsx("li", {
        children: "\u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u0430\u0441\u0441\u0438\u0440 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u043E\u0442\u0440\u0430\u0436\u0435\u043D \u043A\u0443\u0440\u0441\u0438\u0432\u043E\u043C"
      })]
    }) : null
  });
};

/* harmony default export */ var InfoBlock_InfoBlock = (/*#__PURE__*/(0,external_react_.memo)(InfoBlock));
// EXTERNAL MODULE: ./styles/Cashier.module.css
var Cashier_module = __webpack_require__(355);
var Cashier_module_default = /*#__PURE__*/__webpack_require__.n(Cashier_module);
;// CONCATENATED MODULE: ./components/CashierForm/Cashier.tsx






const Cashier = props => {
  const {
    worker,
    title,
    emp,
    data,
    change,
    type,
    onSave,
    showModal,
    serverState
  } = props;

  const handleSave = event => {
    event.preventDefault();
    onSave(data, type);
  };

  const handleGetInfo = async (event) => {
    event.preventDefault();
    const result = await external_axios_default().get(`/api/workers/getbyid?guid=${worker.GUIDString}`);
    const officialName = result.data.RK7Reference.Items[0].Item[0].OfficialName;
    const inn = result.data.RK7Reference.Items[0].Item[0].genTaxPayerIdNum;
    const text = officialName + " " + inn;
    showModal(text, "success");
  };

  return (0,jsx_runtime_.jsxs)("form", {
    className: (Cashier_module_default()).form,
    children: [(0,jsx_runtime_.jsxs)("div", {
      className: (Cashier_module_default()).header,
      children: [(0,jsx_runtime_.jsxs)("h3", {
        children: ["\u041A\u0430\u0441\u0441\u0438\u0440 ", title]
      }), jsx_runtime_.jsx("button", {
        className: (Cashier_module_default()).infoButton,
        onClick: handleGetInfo,
        children: "\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
      })]
    }), (0,jsx_runtime_.jsxs)("span", {
      children: ["\u0424\u0418\u041E: ", worker.OfficialName]
    }), (0,jsx_runtime_.jsxs)("span", {
      children: ["\u0418\u041D\u041D: ", worker.genTaxPayerIdNum]
    }), jsx_runtime_.jsx("hr", {}), data.GUIDString.length > 0 ? (0,jsx_runtime_.jsxs)("div", {
      className: (Cashier_module_default()).inform,
      children: [jsx_runtime_.jsx("h3", {
        children: "\u041A\u0430\u0441\u0441\u0438\u0440 \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043D\u0430:"
      }), (0,jsx_runtime_.jsxs)("span", {
        children: ["\u0424\u0418\u041E: ", data.OfficialName]
      }), (0,jsx_runtime_.jsxs)("span", {
        children: ["\u0418\u041D\u041D: ", data.genTaxPayerIdNum]
      })]
    }) : null, (0,jsx_runtime_.jsxs)("select", {
      id: type,
      onChange: e => change(e),
      className: (Cashier_module_default()).input,
      children: [(0,jsx_runtime_.jsxs)("option", {
        value: worker.GUIDString,
        className: (Cashier_module_default()).currentOption,
        children: [worker.OfficialName, " : ", worker.genTaxPayerIdNum]
      }), emp.length > 0 ? emp.filter(item => item.genTaxPayerIdNum !== worker.genTaxPayerIdNum).map(empItem => (0,jsx_runtime_.jsxs)("option", {
        value: empItem.GUIDString //   className={styles.option}
        ,
        children: [empItem.OfficialName, " :", " ", empItem.genTaxPayerIdNum]
      }, empItem.GUIDString)) : null]
    }), serverState ? jsx_runtime_.jsx("button", {
      onClick: handleSave,
      className: (Cashier_module_default()).submit,
      children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
    }) : null]
  });
};

/* harmony default export */ var CashierForm_Cashier = (/*#__PURE__*/external_react_default().memo(Cashier));
;// CONCATENATED MODULE: ./components/CashierForm/CashierForm.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const bulkWorker = {
  genTaxPayerIdNum: null,
  Code: null,
  Ident: null,
  Name: "",
  OfficialName: "",
  Status: "",
  GUIDString: ""
};

const CashierForm = ({
  workers,
  showModal,
  serverState
}) => {
  const router = (0,router_namespaceObject.useRouter)();
  const {
    0: workerOOO,
    1: setWorkerOOO
  } = (0,external_react_.useState)(workers.find(item => item.Name === "Кассир ООО"));
  const {
    0: workerIP,
    1: setWorkerIP
  } = (0,external_react_.useState)(workers.find(item => item.Name === "Кассир ИП"));
  const {
    0: newIP,
    1: setNewIP
  } = (0,external_react_.useState)(bulkWorker);
  const {
    0: newOOO,
    1: setNewOOO
  } = (0,external_react_.useState)(bulkWorker);
  const {
    0: emp,
    1: setEmp
  } = (0,external_react_.useState)(workers.filter(item => item.OfficialName !== "" && item.Name !== "Кассир ИП" && item.Name !== "Кассир ООО" && item.genTaxPayerIdNum.toString.length > 0));

  const handleChange = event => {
    const {
      id,
      value
    } = event.target;
    const worker = emp.find(workerItem => value === workerItem.GUIDString); // console.log(worker)

    if (id === "OOO") {
      if (worker) {
        setNewOOO(_objectSpread(_objectSpread({}, worker), {}, {
          GUIDString: workerOOO.GUIDString
        }));
      } else {
        setNewOOO(bulkWorker);
      }
    }

    if (id === "IP") {
      if (worker) {
        setNewIP(_objectSpread(_objectSpread({}, worker), {}, {
          GUIDString: workerIP.GUIDString
        }));
      } else {
        setNewIP(bulkWorker);
      }
    }
  };

  const handleSave = async (worker, type) => {
    const result = await external_axios_default().post("/api/setworker", {
      worker
    });

    if (result.data.commandResult.Status === "Ok") {
      showModal(`Кассир ${type} изменен. Перезагрузите страницу`, "refresh");

      if (type === "OOO") {
        setNewOOO(bulkWorker);
      }

      if (type === "IP") {
        setNewIP(bulkWorker);
      }
    } else {
      showModal(`Произошла ошибка! Кассир ${type} неизменен. Перезагрузите страницу`, "error");
    }
  };

  return (0,jsx_runtime_.jsxs)("div", {
    className: (Home_module_default()).formWrapper,
    children: [jsx_runtime_.jsx(CashierForm_Cashier, {
      title: "\u0418\u041F",
      emp: emp,
      data: newIP,
      change: handleChange,
      worker: workerIP,
      type: "IP",
      onSave: handleSave,
      showModal: showModal,
      serverState: serverState
    }), jsx_runtime_.jsx(CashierForm_Cashier, {
      title: "\u041E\u041E\u041E",
      emp: emp,
      data: newOOO,
      change: handleChange,
      worker: workerOOO,
      type: "OOO",
      onSave: handleSave,
      showModal: showModal,
      serverState: serverState
    })]
  });
};

/* harmony default export */ var CashierForm_CashierForm = (CashierForm);
;// CONCATENATED MODULE: ./components/NoData/NoData.tsx





const NoData = () => {
  return (0,jsx_runtime_.jsxs)("div", {
    className: (Home_module_default()).errorBlock,
    children: [jsx_runtime_.jsx("h2", {
      className: (Home_module_default()).errorMessage,
      children: "\u041D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C"
    }), jsx_runtime_.jsx("p", {
      children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439"
    })]
  });
};

/* harmony default export */ var NoData_NoData = (NoData);
;// CONCATENATED MODULE: ./components/CashierBlock/CashierBlock.tsx






const CashierBlock = ({
  state,
  workers,
  showModal,
  styles
}) => {
  return (0,jsx_runtime_.jsxs)("section", {
    className: styles.section,
    children: [state ? jsx_runtime_.jsx(CashierForm_CashierForm, {
      workers: workers,
      showModal: showModal,
      serverState: state
    }) : jsx_runtime_.jsx(NoData_NoData, {}), jsx_runtime_.jsx("div", {
      className: "bulk"
    })]
  });
};

/* harmony default export */ var CashierBlock_CashierBlock = (/*#__PURE__*/(0,external_react_.memo)(CashierBlock));
// EXTERNAL MODULE: ./schemas/schema.ts
var schema = __webpack_require__(890);
;// CONCATENATED MODULE: ./pages/index.tsx



function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }














const Home = ({
  workers,
  status,
  commandResult
}) => {
  const context = (0,external_react_.useContext)(ThingsContext/* default */.ZP);
  const router = (0,router_namespaceObject.useRouter)();
  const {
    0: showModal,
    1: setShowModal
  } = (0,external_react_.useState)(false);
  const {
    0: modalMessage,
    1: setModalMessage
  } = (0,external_react_.useState)("");
  const {
    0: serverState,
    1: setServerState
  } = (0,external_react_.useState)(status.Status === "Ok");

  const refreshStatus = async () => {
    const result = await external_axios_default().get("/api/getStatus");

    if (result.data.error) {
      setServerState(false);
    } else {
      setServerState(true);
    }
  };

  (0,external_react_.useEffect)(() => {
    setInterval(() => {
      console.log("refresh");
      refreshStatus();
    }, 30000);
  }, []);
  const handleShowModal = (0,external_react_.useCallback)(text => {
    setModalMessage(text);
    setShowModal(!showModal);
  }, [showModal]);

  const handleClick = () => {
    setModalMessage("");
    setShowModal(false);
    router.reload();
  };

  const handleOpenModal = (0,external_react_.useCallback)(() => {
    setModalMessage("");
    setShowModal(!showModal);
  }, [showModal]);
  return (0,jsx_runtime_.jsxs)(Layout_Layout, {
    serverState: serverState,
    status: status,
    children: [jsx_runtime_.jsx(InfoBlock_InfoBlock, {
      styles: (Home_module_default()),
      show: serverState
    }), jsx_runtime_.jsx(CashierBlock_CashierBlock, {
      workers: workers,
      styles: (Home_module_default()),
      showModal: handleShowModal,
      state: serverState
    }), (0,jsx_runtime_.jsxs)(Modal_Modal, {
      show: showModal,
      onClose: handleOpenModal,
      children: [jsx_runtime_.jsx("p", {
        children: modalMessage
      }), jsx_runtime_.jsx("button", {
        className: (Home_module_default()).modalButton,
        onClick: handleClick,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      })]
    })]
  });
};

/* harmony default export */ var pages = (Home);
const getStaticProps = async () => {
  const employeesSchema = (0,schema/* getEmployees */.fN)();
  const employeesData = await (0,useGetData/* sendData */.$)(employeesSchema);
  const {
    error,
    data,
    isAxiosError,
    code
  } = employeesData;

  if (!error) {
    const response = (0,usePareser/* useParser */.S)(data);

    const _response$RK7QueryRes = response.RK7QueryResult[0],
          {
      CommandResult
    } = _response$RK7QueryRes,
          status = _objectWithoutProperties(_response$RK7QueryRes, ["CommandResult"]);

    const _CommandResult$ = CommandResult[0],
          {
      SourceCommand,
      RK7Reference
    } = _CommandResult$,
          commandResult = _objectWithoutProperties(_CommandResult$, ["SourceCommand", "RK7Reference"]);

    const workers = RK7Reference[0].Items[0].Item.filter(worker => worker.Status !== "rsDeleted");
    return {
      props: {
        workers,
        status,
        commandResult
      },
      revalidate: 6000
    };
  } else {
    return {
      props: {
        status: {
          Status: "no ok",
          isAxiosError,
          text: code || ""
        }
      }
    };
  }
};

/***/ }),

/***/ 890:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ik": function() { return /* binding */ getEmployeesByGuid; },
/* harmony export */   "fN": function() { return /* binding */ getEmployees; },
/* harmony export */   "UK": function() { return /* binding */ setWorker; },
/* harmony export */   "So": function() { return /* binding */ getSystemInfo; }
/* harmony export */ });
const getEmployeesByGuid = guid => {
  return `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="GetRefData" RefName="Employees" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
        <PROPFILTERS>
            <PROPFILTER name="GUIDString" value="${guid}" />
        </PROPFILTERS>
    </RK7Command2>
    </RK7Query>`;
};
const getEmployees = () => `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="${process.env.MAINPARENTIDENT}"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`;
const setWorker = worker => {
  return `<?xml version="1.0" encoding="utf-8"?>
    <RK7Query>
      <RK7Command2 CMD="SetRefData" RefName="Employees">
        <Items>
            <Item 
              GUIDString="${worker.GUIDString}" 
              genTaxPayerIdNum="${worker.genTaxPayerIdNum}"
              OfficialName="${worker.OfficialName}"/>
        </Items>
    </RK7Command2>
  </RK7Query>`;
};
const getSystemInfo = () => `<?xml version="1.0" encoding="utf-8"?>
<RK7Query>
  <RK7Command2 CMD="GetSystemInfo" />
 
</RK7Query>`;

/***/ }),

/***/ 355:
/***/ (function(module) {

// Exports
module.exports = {
	"form": "Cashier_form__dr-7K",
	"header": "Cashier_header__1F_3e",
	"infoButton": "Cashier_infoButton__Dn18_",
	"inform": "Cashier_inform__bZYDJ",
	"input": "Cashier_input__26JBn",
	"currentOption": "Cashier_currentOption__2NI9E",
	"option": "Cashier_option__3VB9K",
	"submit": "Cashier_submit__QiJmT",
	"button": "Cashier_button__1FQHE"
};


/***/ }),

/***/ 514:
/***/ (function(module) {

// Exports
module.exports = {
	"header": "Header_header__182Qc",
	"title": "Header_title__1vi4d",
	"circleActive": "Header_circleActive__I4VLX",
	"circleInActive": "Header_circleInActive__Ys6GJ",
	"statusBlock": "Header_statusBlock__2bZwf"
};


/***/ }),

/***/ 644:
/***/ (function(module) {

// Exports
module.exports = {
	"container": "Home_container__1EcsU",
	"wrapper": "Home_wrapper__3EDsh",
	"main": "Home_main__1x8gC",
	"section": "Home_section__16Giz",
	"titleBlock": "Home_titleBlock__1Inm8",
	"title": "Home_title__3DjR7",
	"circleActive": "Home_circleActive__2EdrU",
	"circleInActive": "Home_circleInActive__3DR7d",
	"grid": "Home_grid__2Ei2F",
	"card": "Home_card__2SdtB",
	"cardTitle": "Home_cardTitle__2c4qx",
	"cardText": "Home_cardText__fqI49",
	"label": "Home_label__36S2X",
	"button": "Home_button__Xc9mA",
	"error": "Home_error__2G27F",
	"modal": "Home_modal__1PpCQ",
	"modalWrapper": "Home_modalWrapper__2crM4",
	"moveWrapper": "Home_moveWrapper__1J9jY",
	"modalTextBlock": "Home_modalTextBlock__97UxQ",
	"move": "Home_move__1eLl-",
	"modalButton": "Home_modalButton__21sTB",
	"formWrapper": "Home_formWrapper__1ryuI",
	"input": "Home_input__2_zyB",
	"errorBlock": "Home_errorBlock__27OHX",
	"errorMessage": "Home_errorMessage__aZmWd",
	"info": "Home_info__337F2"
};


/***/ }),

/***/ 554:
/***/ (function(module) {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");;

/***/ }),

/***/ 376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

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
var __webpack_exports__ = (__webpack_exec__(617));
module.exports = __webpack_exports__;

})();