import { TOffers } from '../../types/offers';

import { getCityFilteredOffers, getFavoriteOffers } from '../../utils/filter-utils';

import Header from '../../components/header/header';
import FooterLogo from '../../components/footer-logo/footer-logo';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import FavoriteLocationsList from '../../components/favorite-places-list/favorite-locations-list';

export default function FavoritesScreen(): React.JSX.Element {
  const offers = useAppSelector((store) => store.offers);
  const favoriteOffers = getFavoriteOffers(offers);
  const cities = new Set(favoriteOffers.map((offer) => offer.city.name));
  const cityOffers = new Map<string, TOffers>();

  cities.forEach((city) => cityOffers.set(
    city,
    getCityFilteredOffers(favoriteOffers, city)
  ));

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Favorite offers</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteLocationsList cities={cities} cityOffers={cityOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <FooterLogo />
      </footer>
    </div>
  );
}
