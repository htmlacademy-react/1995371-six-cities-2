import { render, screen } from '@testing-library/react';
import OfferPrice from './offer-price';
import { PriceViewMode } from '../../../const/mode';

describe('Component: OfferPrice', () => {
  const stubPrice = 400;
  const expectedPriceValueText = `€${stubPrice}`;
  const expectedPriceText = '/ night';

  it('Should render correctly in case of default mode', () => {
    const defaultMode = PriceViewMode.Card;
    const priceValueElementClassname = `${defaultMode}__price-value`;
    const priceTextElementClassname = `${defaultMode}__price-text`;

    render(<OfferPrice offerPrice={stubPrice} />);
    const priceValueElement = screen.getByText(expectedPriceValueText);
    const priceTextElement = screen.getByText(expectedPriceText);
    expect(priceValueElement).toBeInTheDocument();
    expect(priceTextElement).toBeInTheDocument();
    expect(priceValueElement.className).toBe(priceValueElementClassname);
    expect(priceTextElement.className).toBe(priceTextElementClassname);
  });

  it('Should render correctly in case of specific mode', () => {
    const mode = PriceViewMode.Offer;
    const priceValueElementClassname = `${mode}__price-value`;
    const priceTextElementClassname = `${mode}__price-text`;

    render(<OfferPrice offerPrice={stubPrice} priceViewMode={mode}/>);
    const priceValueElement = screen.getByText(expectedPriceValueText);
    const priceTextElement = screen.getByText(expectedPriceText);
    expect(priceValueElement).toBeInTheDocument();
    expect(priceTextElement).toBeInTheDocument();
    expect(priceValueElement.className).toBe(priceValueElementClassname);
    expect(priceTextElement.className).toBe(priceTextElementClassname);
  });
});
