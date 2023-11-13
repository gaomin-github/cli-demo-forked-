// // 原理

// 包装原生context返回不变的 getValue
// useNewContext时，传入string/function

// useNewContext内部，用useContext，在useContext中注册一个callback；useContext有任何变更，执行回调

// useContext内部值变更监听：包装createContext，用useEffect监听value，传入provider

// 回调：更新当前组件（用useState forceUpdate)

// 参考：https://github.com/react-component/context/blob/master/src/context.tsx
