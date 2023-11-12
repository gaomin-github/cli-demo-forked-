import React from 'react';

// import { printLog } from '@cli-demo-pj/tools/lib/ejs/utils/tools';
var NormalButton = function NormalButton() {
  var handleBtnClick = function handleBtnClick() {
    // printLog('normalButton');
  };
  return React.createElement("div", {
    onClick: handleBtnClick
  }, " normal button");
};

export { NormalButton };
//# sourceMappingURL=index.js.map
