"use strict";

export const reportException = (e: unknown) => {
  if (!e) {
    return;
  }
  const { code = 0, msg = "" } = e as { code: number; msg: string };
  console.log("reportException code", code, "msg", msg);
};

export const printLog = (log: string,isError = false) => {
  if (isError) {
    console.error(`printLog：${log}`);
    return;
  }
  console.log(`printLog：${log}`);
};

export const requestApi = () => {
  printLog('request init');
};