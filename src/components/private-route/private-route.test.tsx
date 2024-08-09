import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeStoreState } from '../../utils/mocks';
import { StoreNameSpace } from '../../const/store';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('Should render component for public route when user not authorized', () => {
    const privateText = 'private text';
    const publicText = 'public text';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{privateText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      makeFakeStoreState({[StoreNameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth, userEmail: ''}})
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(publicText)).toBeInTheDocument();
    expect(screen.queryByText(privateText)).not.toBeInTheDocument();
  });

  it('Should render component for private route when user is authorized', () => {
    const privateText = 'private text';
    const publicText = 'public text';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{privateText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      makeFakeStoreState({[StoreNameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, userEmail: ''}})
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(privateText)).toBeInTheDocument();
    expect(screen.queryByText(publicText)).not.toBeInTheDocument();
  });

  it('Should render component for private route when authorizationStatus is unknown', () => {
    const privateText = 'private text';
    const publicText = 'public text';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{privateText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      makeFakeStoreState({[StoreNameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, userEmail: ''}})
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(privateText)).toBeInTheDocument();
    expect(screen.queryByText(publicText)).not.toBeInTheDocument();
  });
});
