import { render, screen } from '@testing-library/react';
import OfferMark from './offer-mark';

describe('Component: OfferMark', () => {
  it('should render correctly', () => {
    const expectedText = /Premium/i;
    render(<OfferMark />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
