import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { getRandomCity } from '../utils/mocks';
import { Map } from 'leaflet';

describe('Hook: useMap', () => {
  it('Should return instance of Map', () => {
    const container = document.createElement('div');
    const stubMapRef = {
      current: container
    };
    const { result } = renderHook(() => useMap(stubMapRef, getRandomCity()));
    expect(result.current).toBeInstanceOf(Map);
  });
});
