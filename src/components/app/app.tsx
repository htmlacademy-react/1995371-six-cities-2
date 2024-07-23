import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { TCityPackType } from '../../types/city';
import { AppRoute } from '../../const/const';

import ScrollToTop from '../shared/scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import Error404Screen from '../../pages/error-404-screen/error-404-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

type AppProps = {
  cityPack: TCityPackType;
}

export default function App({
  cityPack
}: AppProps): React.JSX.Element {

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen cityPack={cityPack}/>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferScreen />
            }
          />
          <Route
            path={AppRoute.Page404}
            element={<Error404Screen />}
          />
          <Route
            path="*"
            element={<Navigate to={AppRoute.Page404} />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
