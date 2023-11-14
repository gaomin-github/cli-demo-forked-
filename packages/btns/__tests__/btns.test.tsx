'use strict';

import { render } from '@testing-library/react';
import React from 'react';
import { NormalButton } from '../src';

describe('btns', () => {
  it('normalButton', () => {
    const { container } = render(<NormalButton />);
    expect((container as Element).querySelector('.normal-button')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
