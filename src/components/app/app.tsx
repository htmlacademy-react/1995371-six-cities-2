import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Offers } from '../../types/offers';
import { ReviewsPack } from '../../types/reviews';
import { CityPackType } from '../../types/city';

import { AppRoute, AuthorizationStatus } from '../../const/const';

import ScrollToTop from '../shared/scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import Error404Screen from '../../pages/error-404-screen/error-404-screen';

type AppProps = {
  offers: Offers;
  reviewsPack: ReviewsPack;
  cityPack: CityPackType;
}

export default function App({
  offers,
  reviewsPack,
  cityPack
}: AppProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen offers={offers} cityPack={cityPack}/>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <OfferScreen
              offers={offers}
              reviewsPack={reviewsPack}
            />
          }
        />
        <Route
          path="*"
          element={<Error404Screen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
