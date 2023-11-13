// 初始化和update时，有props，以props值为准
// 实现参考
// https://github.com/react-component/input/blob/master/src/Input.tsx

// 问题：不做成useMergedState会有什么问题？
// 举例：
// 表单联动 ，需要跟随外部input变化，同时内部可更新(状态提升可处理)

// 使用场景：
// uerMergedState用来，为组件提供多种使用方式，和业务无关
// 受控和非受控的选择参考：
// https://www.nowcoder.com/discuss/368384573162496000
// https://github.com/ant-design/pro-components/issues/5533
// https://cloud.tencent.com/developer/article/2195455
