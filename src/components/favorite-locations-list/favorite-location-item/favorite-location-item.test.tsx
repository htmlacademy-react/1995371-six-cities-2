import { render, screen } from '@testing-library/react';
import { getRandomCity, makeFakeShortOffer } from '../../../utils/mocks';
import FavoriteLocationItem from './favorite-location-item';

vi.mock('../../shared/places-list/places-list', () => ({
  default: () => <div data-testid='mocked PlacesList'>Mocked places list</div>
}));

describe('Component: FavoriteLocationItem', () => {
  it('Should render correctly', () => {
    const stubCity = getRandomCity();
    const stubFilteredOffers = [makeFakeShortOffer({})];

    render(<FavoriteLocationItem cityName={stubCity.name} filteredOffers={stubFilteredOffers} />);

    expect(screen.getByText(stubCity.name)).toBeInTheDocument();
    expect(screen.getByTestId('mocked PlacesList')).toBeInTheDocument();
  });
});
