import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { CityPack } from '../../const/citypack';
import { StoreNameSpace } from '../../const/store';
import { makeFakeStoreState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  const screenTitleTestid = 'screen title element';

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Should render "MainScreen" in case of navigate to "/"', () => {
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, makeFakeStoreState());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Main);
    const screenTitleText = 'Cities';

    render(withHistoryComponent);
    expect(screen.getByTestId(screenTitleTestid).textContent).toBe(screenTitleText);
  });

  it('Should render "LoginScreen" in case of navigate to "/login"', () => {
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, makeFakeStoreState());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);
    const screenTitleText = 'Sign in';

    render(withHistoryComponent);
    expect(screen.getByTestId(screenTitleTestid).textContent).toBe(screenTitleText);
  });

  it('Should render "FavoritesScreen" in case of navigate to "/favorites"', () => {
    const favoritesContainerTestid = 'favorites container';
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, makeFakeStoreState({
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@Email.com'
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Favorites);

    render(withHistoryComponent);
    expect(screen.getByTestId(favoritesContainerTestid)).toBeInTheDocument();
  });

  it('Should render "OfferScreen" in case of navigate to ', () => {
    const offerScreenMainTestid = 'offerScreen main element';
    const stubState = makeFakeStoreState();
    const currentId = stubState.data.currentOffer?.id as string;
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, stubState);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`${AppRoute.OfferBase}/${currentId}`);

    render(withHistoryComponent);
    expect(screen.getByTestId(offerScreenMainTestid)).toBeInTheDocument();
  });

  it('Should render "Error404Screen" in case of navigate to "/404"', () => {
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, makeFakeStoreState());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Page404);
    const screenTitleText = '404. Страница не найдена.';

    render(withHistoryComponent);
    expect(screen.getByTestId(screenTitleTestid).textContent).toBe(screenTitleText);
  });

  it('Should render "Error404Screen" in case of navigate to non-existent route', () => {
    const { withStoreComponent } = withStore(<App cityPack={CityPack}/>, makeFakeStoreState());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push('/unknown route');
    const screenTitleText = '404. Страница не найдена.';

    render(withHistoryComponent);
    expect(screen.getByTestId(screenTitleTestid).textContent).toBe(screenTitleText);
  });
});
