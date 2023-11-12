"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveStatus = void 0;
const ErrorCodeMap = {
    // 现在还没有错误类型
    "302": "cache",
    "404": "not found",
};
var MoveStatus;
(function (MoveStatus) {
    MoveStatus[MoveStatus["Pending"] = 1] = "Pending";
    MoveStatus[MoveStatus["Inflight"] = 2] = "Inflight";
    MoveStatus[MoveStatus["Success"] = 3] = "Success";
    MoveStatus[MoveStatus["Error"] = 4] = "Error";
    MoveStatus[MoveStatus["Paused"] = 5] = "Paused";
    MoveStatus[MoveStatus["PartialError"] = 6] = "PartialError";
})(MoveStatus = exports.MoveStatus || (exports.MoveStatus = {}));
//# sourceMappingURL=status.js.map