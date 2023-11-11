import React from 'react';
import { NormalButton } from '@cli-demo-pj/btns/src/normal-button';
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