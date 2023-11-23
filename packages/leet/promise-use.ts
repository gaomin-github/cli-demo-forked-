import { ResolvePlugin } from 'webpack';

const singleRequestMock = (params: unknown, duration = 1000, success = true, isError = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(params);
      } else {
        reject(params);
      }
    }, duration);
  });
};

const MAX_PARALLEL_NUM = 3;
const totalTaskArr: unknown[] = [];
const pendingMap = {};
let currentTaskPointer = 0;

// 返回：
// 批量task的request + response 信息

const batchRequestHandle = (taskArr: unknown[]) => {
  const startTaskPointer = totalTaskArr.length;
  totalTaskArr.push(...taskArr);

  const taskSchedule = async (
    index: number,
    taskParams: unknown,
    resolve: (params: unknown) => void,
  ) => {
    const res = await singleRequestMock(taskParams);
    if (currentTaskPointer === startTaskPointer + taskArr.length - 1) {
      resolve([res]);
    }

    totalTaskArr[index] = {
      ...(totalTaskArr[index] || {}),
      res,
    };

    const nextTaskPointer = ++currentTaskPointer;

    taskSchedule(nextTaskPointer, totalTaskArr[nextTaskPointer], resolve);
  };

  return new Promise((resolve, reject) => {
    // taskArr执行结束后，resolve/reject
  });
};
