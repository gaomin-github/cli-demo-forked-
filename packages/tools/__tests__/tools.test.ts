'use strict';

import { requestApi, asyncRequest, clone } from '../src/utils/tools';
import loadshEs from 'lodash-es';

jest.mock('lodash-es', () => ({}));

describe('tools', () => {
  it(' requestApi', () => {
    expect(requestApi(null)).toBe(null);
  });

  it('asyncRequest', async () => {
    const success = await asyncRequest('a', true);
    expect(success).toBe('resolve: a');

    expect(await asyncRequest('a')).rejects.toBe('reject: a');
    return asyncRequest('a').then((data) => {
      expect(data).toBe('reject: a');
    });
  });

  it('mock npm', async () => {
    loadshEs.cloneDeep = jest.fn().mockReturnValue([{}, () => ({})]);
    // const { result } = clone();
  });
});
