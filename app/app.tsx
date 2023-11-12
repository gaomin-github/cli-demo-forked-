import React from "react";
import Button from "./components/button";
import Root from "./components/Root";

console.log("app-----");
export default () => {
  const arr = ["a", "b", 1];
  return (
    <div>
      {arr.map((item, itemIndex) => {
        return <Button key={itemIndex} />;
      })}
      <Root />
    </div>
  );
};
