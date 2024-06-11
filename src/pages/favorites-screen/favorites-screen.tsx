import { Offers } from '../../types/offers';

import { PlaceCardModeOption } from '../../const';
import { getCityFilteredOffers, getFavoriteOffers } from '../../utils/filter-utils';

import Header from '../../components/header/header';
import FooterLogo from '../../components/footer-logo/footer-logo';
import PlacesList from '../../components/places-list/places-list';

type FavoritesScreenProps = {
  offers: Offers;
}

export default function FavoritesScreen({offers}: FavoritesScreenProps): React.JSX.Element {
  const favoriteOffers = getFavoriteOffers(offers);
  const cities = new Set(favoriteOffers.map((offer) => offer.city.name));
  const cityOffers = new Map<string, Offers>();

  cities.forEach((city) => cityOffers.set(
    city,
    getCityFilteredOffers(favoriteOffers, city)
  ));

  const locationItemsLists = Array.from(cities).map((city) => {
    const filteredOffers = cityOffers.get(city) as Offers;

    return (
      <li className="favorites__locations-items" key={city}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{city}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          <PlacesList offers={filteredOffers} cardMode={PlaceCardModeOption.Favorite}/>
        </div>
      </li>
    );

  });

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {locationItemsLists}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <FooterLogo />
      </footer>
    </div>
  );
}
