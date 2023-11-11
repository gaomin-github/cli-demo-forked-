"use strict";

const reportException = (e: unknown) => {
  if (!e) {
    return;
  }
  const { code = 0, msg = "" } = e as { code: number; msg: string };
  console.log("reportException code", code, "msg", msg);
};

const printLog = (log: string) => {
  console.log(`printLog：${log}`);
};

const printError = (log: string) => {
  console.error(`printLog：${log}`);
};

const tools = {
  reportException,
  printLog,
  printError,
};

export default tools;
