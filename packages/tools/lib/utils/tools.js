"use strict";
const reportException = (e) => {
    if (!e) {
        return;
    }
    const { code = 0, msg = "" } = e;
    console.log("reportException code", code, "msg", msg);
};
const printLog = (log, isError = false) => {
    if (isError) {
        console.error(`printLog：${log}`);
        return;
    }
    console.log(`printLog：${log}`);
};
const tools = {
    reportException,
    printLog,
};
export default tools;
//# sourceMappingURL=tools.js.map