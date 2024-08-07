import { render, screen } from '@testing-library/react';
import GoodsInsideModule from './goods-inside-module';

describe('Component: GoodsInsideModule', () => {
  it('should render correctly', () => {
    const goodsListTestid = 'goods list';
    const expectedTitleText = 'What\'s inside';
    const stubGoods = [
      'product1',
      'product2'
    ];

    render(<GoodsInsideModule goods={stubGoods} />);
    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(goodsListTestid)).toBeInTheDocument();
  });
});
