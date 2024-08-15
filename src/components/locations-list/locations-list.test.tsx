import { render, screen } from '@testing-library/react';
import LocationsList from './locations-list';
import { CityPack } from '../../const/citypack';
import { withStore } from '../../utils/mock-component';
import { makeFakeStoreState } from '../../utils/mocks';

vi.mock('./locations-list-item/locations-list-item', () => ({
  default: () => <div data-testid='mocked LocationsListItem'>Mocked location item</div>
}));

describe('Component: LocationsList', () => {
  it('Should render correctly', () => {
    const locationsListTestid = 'locations list element';
    const citiesAmount = Object.keys(CityPack).length;
    const { withStoreComponent } = withStore(<LocationsList cityPack={CityPack} />, makeFakeStoreState());

    render(withStoreComponent);

    expect(screen.getByTestId(locationsListTestid)).toBeInTheDocument();
    expect(screen.getAllByTestId('mocked LocationsListItem').length).toBe(citiesAmount);
  });
});
