'use strict';
import cloneDeep from 'lodash-es/cloneDeep';

const addPrefix = (str: string) => {
  return `tools: ${str}`;
};

export const reportException = (e: unknown) => {
  if (!e) {
    return;
  }
  const { code = 0, msg = '' } = e as { code: number; msg: string };
  console.log('reportException code', code, 'msg', msg);
};

export const printLog = (log: string, isError = false) => {
  if (isError) {
    console.error(`printLog：${log}`);
    return;
  }
  console.log(`printLog：${log}`);
};

export const requestApi = (params: unknown) => {
  return addPrefix(params as string);
};

export const asyncRequest = (params: unknown, isSuccesss?: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccesss) {
        resolve(`resolve: ${params}`);
      } else {
        reject(`reject: ${params}`);
      }
    }, 1000 * 1);
  });
};

export const clone = (params: unknown, isDeep?: boolean) => {
  if (isDeep) {
    return cloneDeep(params);
  } else {
    return { ...(params || {}) };
  }
};
