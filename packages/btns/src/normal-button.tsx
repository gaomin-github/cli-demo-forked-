import React from 'react';
// import { printLog } from '@cli-demo-pj/tools/lib/ejs/utils/tools';

export const NormalButton = () => {
  const handleBtnClick = () => {
    // printLog('normalButton');
  };

  return (
    <div onClick={handleBtnClick}> normal button</div>
  );
}