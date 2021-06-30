(function() {
var exports = {};
exports.id = 985;
exports.ids = [985];
exports.modules = {

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

/***/ 549:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hooks_useGetData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(900);
/* harmony import */ var _hooks_usePareser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(911);
/* harmony import */ var schemas_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890);
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const handleSave = async worker => {
  const schema = (0,schemas_schema__WEBPACK_IMPORTED_MODULE_2__/* .setWorker */ .UK)(worker);
  return await (0,_hooks_useGetData__WEBPACK_IMPORTED_MODULE_0__/* .sendData */ .$)(schema);
};

/* harmony default export */ __webpack_exports__["default"] = (async (req, res) => {
  const {
    worker
  } = req.body;

  if (worker.GUIDString === "") {
    return res.status(200).json({
      commandResult: {
        Status: "noChanges"
      }
    });
  }

  const result = (0,_hooks_usePareser__WEBPACK_IMPORTED_MODULE_1__/* .useParser */ .S)(await handleSave(worker));

  if (result !== null && result !== void 0 && result.RK7QueryResult) {
    const _result$RK7QueryResul = result.RK7QueryResult[0],
          {
      CommandResult
    } = _result$RK7QueryResul,
          queryResult = _objectWithoutProperties(_result$RK7QueryResul, ["CommandResult"]);

    res.status(200).json({
      queryResult,
      commandResult: CommandResult[0]
    });
  } else {
    res.status(500);
  }
});

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

/***/ 376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(549));
module.exports = __webpack_exports__;

})();