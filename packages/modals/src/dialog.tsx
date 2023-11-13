import React from 'react';
import { NormalButton } from '@cli-demo-pj/btns';
import { ButtonDemo } from './button-demo';

export const Dialog = () => {
  const handle = () => {
    let a = 1;
    let b = 2;
  };
  return (
    <div>
      dialog
      <div>{/* <NormalButton /> */}</div>
      <div>
        <ButtonDemo />
      </div>
    </div>
  );
};
