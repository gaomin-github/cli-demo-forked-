import React from 'react';
import Log from '@cli-demo-pj/tools/lib/utils/tools';

export const NormalButton = () => {
  const handleBtnClick = () => {
    Log.printLog('normalButton');
  };

  return (
    <div onClick={handleBtnClick}> normal button</div>
  );
}