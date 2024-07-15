import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TFullOffersPack, Offers } from '../../types/offers';
import { TReviewsPack } from '../../types/reviews';
import { TCityPackType } from '../../types/city';

import { AppRoute } from '../../const/const';

import ScrollToTop from '../shared/scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import Error404Screen from '../../pages/error-404-screen/error-404-screen';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  offers: Offers;
  fullOffersPack: TFullOffersPack;
  reviewsPack: TReviewsPack;
  cityPack: TCityPackType;
}

export default function App({
  offers,
  fullOffersPack,
  reviewsPack,
  cityPack
}: AppProps): React.JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
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
            element={<LoginScreen offers={offers} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesScreen offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferScreen
                offers={offers}
                fullOffersPack={fullOffersPack}
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
    </HelmetProvider>
  );
}
