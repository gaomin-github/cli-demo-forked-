declare const tools: {
    reportException: (e: unknown) => void;
    printLog: (log: string, isError?: boolean) => void;
};
export default tools;
