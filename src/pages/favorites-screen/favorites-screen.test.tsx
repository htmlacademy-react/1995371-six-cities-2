import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { makeFakeStoreState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { StoreNameSpace } from '../../const/store';

const favoritesSectionTestid = 'mocked FavoritesSection';
const favoritesSectionEmptyTestid = 'mocked FavoritesSectionEmpty';
const footerLogoTestid = 'mocked FooterLogo';

vi.mock('../../components/favorites-section/favorites-section', () => ({
  default: () => <div data-testid='mocked FavoritesSection'>Mocked favorites section</div>
}));

vi.mock('../../components/favorites-section/favorites-section-empty', () => ({
  default: () => <div data-testid='mocked FavoritesSectionEmpty'>Mocked empty favorites section</div>
}));

vi.mock('../../components/footer-logo/footer-logo', () => ({
  default: () => <div data-testid='mocked FooterLogo'>Mocked footer logo</div>
}));

describe('Component: FavoritesScreen', () => {
  const containerTestid = 'screen container';
  const initialState = makeFakeStoreState();
  const defaultContainerClassname = 'page';
  const emptyOffersContainerClassname = 'page--favorites-empty';

  it('Should render correctly in case of favorite offers', () => {
    const { withStoreComponent } = withStore(<FavoritesScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesSectionTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(favoritesSectionEmptyTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(footerLogoTestid)).toBeInTheDocument();
    expect(screen.getByTestId(containerTestid).className).toBe(defaultContainerClassname);
  });

  it('Should render correctly in case of empty favorite offers', () => {
    const expectedClassname = `${defaultContainerClassname} ${emptyOffersContainerClassname}`;
    const stubState = {
      ...initialState,
      [StoreNameSpace.Data]: {
        ...initialState.data,
        favoriteOffers: []
      }
    };
    const { withStoreComponent } = withStore(<FavoritesScreen />, stubState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesSectionEmptyTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(favoritesSectionTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(footerLogoTestid)).toBeInTheDocument();
    expect(screen.getByTestId(containerTestid).className).toBe(expectedClassname);
  });
});
