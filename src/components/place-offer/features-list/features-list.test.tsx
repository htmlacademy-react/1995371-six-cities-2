import { render, screen } from '@testing-library/react';
import { AccommodationType } from '../../../const/const';
import FeaturesList from './features-list';

describe('Component: FeaturesList', () => {
  const accommodationTypeTestid = 'accommodationType element';
  const bedroomsAmountTestid = 'bedroomsAmount element';
  const maxAdultsAmountTestid = 'maxAdultsAmount element';

  const stubAccommodationType = AccommodationType.House;

  it('Should render correctly in case of singular props values', () => {
    const stubBedroomsAmount = 1;
    const stubMaxAdultsAmount = 1;
    const bedroomsAmountText = '1 Bedroom';
    const maxAdultsAmountText = 'Max 1 adult';

    render(
      <FeaturesList
        accommodationType={stubAccommodationType}
        bedroomsAmount={stubBedroomsAmount}
        maxAdultsAmount={stubMaxAdultsAmount}
      />
    );

    expect(screen.getByTestId(accommodationTypeTestid)).toBeInTheDocument();
    expect(screen.getByTestId(bedroomsAmountTestid)).toBeInTheDocument();
    expect(screen.getByTestId(maxAdultsAmountTestid)).toBeInTheDocument();

    expect(screen.getByTestId(accommodationTypeTestid).textContent).toBe(stubAccommodationType);
    expect(screen.getByTestId(bedroomsAmountTestid).textContent).toBe(bedroomsAmountText);
    expect(screen.getByTestId(maxAdultsAmountTestid).textContent).toBe(maxAdultsAmountText);
  });

  it('Should render correctly in case of plural props values', () => {
    const stubBedroomsAmount = 3;
    const stubMaxAdultsAmount = 3;
    const bedroomsAmountText = '3 Bedrooms';
    const maxAdultsAmountText = 'Max 3 adults';

    render(
      <FeaturesList
        accommodationType={stubAccommodationType}
        bedroomsAmount={stubBedroomsAmount}
        maxAdultsAmount={stubMaxAdultsAmount}
      />
    );

    expect(screen.getByTestId(accommodationTypeTestid)).toBeInTheDocument();
    expect(screen.getByTestId(bedroomsAmountTestid)).toBeInTheDocument();
    expect(screen.getByTestId(maxAdultsAmountTestid)).toBeInTheDocument();

    expect(screen.getByTestId(accommodationTypeTestid).textContent).toBe(stubAccommodationType);
    expect(screen.getByTestId(bedroomsAmountTestid).textContent).toBe(bedroomsAmountText);
    expect(screen.getByTestId(maxAdultsAmountTestid).textContent).toBe(maxAdultsAmountText);
  });
});
