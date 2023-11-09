"use strict";
const reportException = (e) => {
    if (!e) {
        return;
    }
    const { code = 0, msg = "" } = e;
    console.log("reportException", code, msg);
};
const printLog = (log) => {
    console.log(`printLog：${log}`);
};
const tools = {
    reportException,
    printLog,
};
export default tools;
//# sourceMappingURL=tools.js.map