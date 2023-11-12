import React from 'react';
import { NormalButton } from '@cli-demo-pj/btns';
import { ButtonDemo } from './button-demo';

export const Dialog = () => {
  return (
  <div>
    dialog
    <div>
      <NormalButton />
    </div>
    <div>
      <ButtonDemo/>
    </div>
  </div>
  );
}