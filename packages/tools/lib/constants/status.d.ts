declare type ValueOf<T> = T[keyof T];
declare const ErrorCodeMap: {
    "302": string;
    "404": string;
};
export declare enum MoveStatus {
    Pending = 1,
    Inflight = 2,
    Success = 3,
    Error = 4,
    Paused = 5,
    PartialError = 6
}
export declare type ERROR_CODE_TYPE = ValueOf<typeof ErrorCodeMap>;
export {};
