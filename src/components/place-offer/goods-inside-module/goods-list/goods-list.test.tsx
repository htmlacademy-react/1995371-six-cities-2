import { render, screen } from '@testing-library/react';
import GoodsList from './goods-list';

describe('Component: GoodsList', () => {
  it('should render correctly', () => {
    const goodItemTestid = 'good item';
    const stubGoods = [
      'product1',
      'product2'
    ];

    render(<GoodsList goods={stubGoods} />);
    const goodItemElements = screen.getAllByTestId(goodItemTestid);
    expect(goodItemElements.length).toBe(stubGoods.length);
    expect(goodItemElements.at(-1)?.textContent).toBe(stubGoods.at(-1));
  });
});
