import classNames from 'classnames';
import Header from '../../components/header/header';
import FooterLogo from '../../components/footer-logo/footer-logo';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import FavoritesSection from '../../components/favorites-section/favorites-section';
import FavoritesSectionEmpty from '../../components/favorites-section/favorites-section-empty';
import { getFavoriteOffers } from '../../store/data-process/data-process.selectors';

export default function FavoritesScreen(): React.JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavoriteOffers = !!favoriteOffers.length;

  return (
    <div
      className={classNames(
        'page',
        {'page--favorites-empty': !isFavoriteOffers}
      )}
    >
      <Helmet>
        <title>Six cities. Favorite offers</title>
      </Helmet>
      <Header />
      <main
        className={classNames(
          'page__main page__main--favorites',
          {'page__main--favorites-empty': !isFavoriteOffers}
        )}
      >
        <div className="page__favorites-container container" data-testid='favorites container'>
          {isFavoriteOffers
            ? <FavoritesSection />
            : <FavoritesSectionEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <FooterLogo />
      </footer>
    </div>
  );
}
