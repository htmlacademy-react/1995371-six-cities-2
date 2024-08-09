import { render, screen } from '@testing-library/react';
import PremiumMark from './premium-mark';
import { PremiumMarkMode } from '../../../const/mode';

describe('Component: OfferMark', () => {
  const markContainerTestid = 'premium mark container';
  const expectedText = 'Premium';

  it('Should render correctly in case of default mode', () => {
    const expectedClassname = `${PremiumMarkMode.Card}__mark`;
    render(<PremiumMark />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(markContainerTestid).className).toBe(expectedClassname);
  });

  it('Should render correctly in case of offer mode', () => {
    const expectedClassname = `${PremiumMarkMode.Offer}__mark`;
    render(<PremiumMark premiumMarkViewMode={PremiumMarkMode.Offer} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(markContainerTestid).className).toBe(expectedClassname);
  });
});
