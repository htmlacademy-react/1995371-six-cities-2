import { render, screen } from '@testing-library/react';
import { CityPack } from '../../const/citypack';
import FavoriteLocationsList from './favorite-locations-list';

vi.mock('./favorite-location-item/favorite-location-item', () => ({
  default: () => <div data-testid='mocked FavoriteLocationItem'>Mocked favorite location</div>
}));

describe('Component: FavoriteLocationsList', () => {
  it('Should render correctly', () => {
    const listTestid = 'favorites list element';
    const stubCities = [CityPack.Amsterdam.name, CityPack.Cologne.name];
    const stubCitiesSet = new Set(stubCities);
    const stubCityOffers = new Map();
    for (const cityName of stubCitiesSet.keys()) {
      stubCityOffers.set(cityName, []);
    }

    render(<FavoriteLocationsList cities={stubCitiesSet} cityOffers={stubCityOffers} />);

    expect(screen.getByTestId(listTestid)).toBeInTheDocument();
    expect(screen.getAllByTestId('mocked FavoriteLocationItem').length).toBe(stubCities.length);
  });
});
