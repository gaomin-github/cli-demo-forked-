"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestApi = exports.printLog = exports.reportException = void 0;
const reportException = (e) => {
    if (!e) {
        return;
    }
    const { code = 0, msg = "" } = e;
    console.log("reportException code", code, "msg", msg);
};
exports.reportException = reportException;
const printLog = (log, isError = false) => {
    if (isError) {
        console.error(`printLog：${log}`);
        return;
    }
    console.log(`printLog：${log}`);
};
exports.printLog = printLog;
const requestApi = () => {
    (0, exports.printLog)('request init');
};
exports.requestApi = requestApi;
//# sourceMappingURL=tools.js.map