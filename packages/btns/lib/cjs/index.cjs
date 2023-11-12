'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// import { printLog } from '@cli-demo-pj/tools/lib/ejs/utils/tools';
var NormalButton = function NormalButton() {
  var handleBtnClick = function handleBtnClick() {
    // printLog('normalButton');
  };
  return React__default["default"].createElement("div", {
    onClick: handleBtnClick
  }, " normal button");
};

exports.NormalButton = NormalButton;
//# sourceMappingURL=index.cjs.map
