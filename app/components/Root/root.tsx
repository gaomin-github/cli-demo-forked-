import React from "react";
import findIndex from "lodash-es/findIndex";

export default function Root() {
  let data = [1, 2, 3, 4];
  data = [findIndex(data, (item) => item % 2 === 0)];
  return <div>{data[0]}Hello React a。fdafa!</div>;
}
