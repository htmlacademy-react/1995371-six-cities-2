import { render, screen } from '@testing-library/react';
import FavoritesSection from './favorites-section';
import { withStore } from '../../utils/mock-component';
import { makeFakeStoreState } from '../../utils/mocks';

vi.mock('../favorite-locations-list/favorite-locations-list', () => ({
  default: () => <div data-testid='mocked FavoriteLocationsList'>Mocked favorite locations list</div>
}));

describe('Component: FavoritesSection', () => {
  it('Should render correctly', () => {
    const expectedTitleText = 'Saved listing';
    const { withStoreComponent } = withStore(<FavoritesSection />, makeFakeStoreState());
    render(withStoreComponent);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByTestId('mocked FavoriteLocationsList')).toBeInTheDocument();
  });
});
