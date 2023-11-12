type ValueOf<T> = T[keyof T];
const ErrorCodeMap = {
  // 现在还没有错误类型
  "302": "cache",
  "404": "not found",
};

export enum MoveStatus {
  Pending = 1, //  未开始
  Inflight = 2, // 已开始 未结束
  Success = 3,
  Error = 4,
  Paused = 5,
  PartialError = 6,
}

export type ERROR_CODE_TYPE = ValueOf<typeof ErrorCodeMap>;
