import React from 'react';
// import Tool from '@cli-demo-pj/tools';

export const NormalButton = () => {
  const handleBtnClick = () => {
    // Tool.printLog('normalButton');
  };

  return (
    <div onClick={handleBtnClick} className="normal-button">
      normal button
    </div>
  );
};
