"use strict";
export const reportException = (e) => {
    if (!e) {
        return;
    }
    const { code = 0, msg = "" } = e;
    console.log("reportException code", code, "msg", msg);
};
export const printLog = (log, isError = false) => {
    if (isError) {
        console.error(`printLog：${log}`);
        return;
    }
    console.log(`printLog：${log}`);
};
export const requestApi = () => {
    printLog('request init');
};
//# sourceMappingURL=tools.js.map