import { Offers } from '../../types/offers';

import { PlaceCardModeOption } from '../../const';
import { getCityFilteredOffers, getFavoriteOffers } from '../../utils/filter-utils';

import Logo from '../../components/logo/logo';
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
