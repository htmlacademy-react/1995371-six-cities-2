import classNames from 'classnames';
import { getFavoriteOffers } from '../../utils/filter-utils';
import Header from '../../components/header/header';
import FooterLogo from '../../components/footer-logo/footer-logo';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import FavoritesSection from '../../components/favorites-section/favorites-section';
import FavoritesSectionEmpty from '../../components/favorites-section/favorites-section-empty';

export default function FavoritesScreen(): React.JSX.Element {
  const offers = useAppSelector((store) => store.offers);
  const favoriteOffers = getFavoriteOffers(offers);


  const isFavoritesOffers = !!favoriteOffers.length;

  return (
    <div
      className={classNames(
        'page',
        {'page--favorites-empty': !isFavoritesOffers}
      )}
    >
      <Helmet>
        <title>Six cities. Favorite offers</title>
      </Helmet>
      <Header />
      <main
        className={classNames(
          'page__main page__main--favorites',
          {'page__main--favorites-empty': !isFavoritesOffers}
        )}
      >
        <div className="page__favorites-container container">
          {isFavoritesOffers
            ? <FavoritesSection favoriteOffers={favoriteOffers} />
            : <FavoritesSectionEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <FooterLogo />
      </footer>
    </div>
  );
}
