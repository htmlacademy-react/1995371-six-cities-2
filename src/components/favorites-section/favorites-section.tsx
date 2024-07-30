import { useSelector } from 'react-redux';
import FavoriteLocationsList from '../favorite-locations-list/favorite-locations-list';
import { getFavoriteCities, getFavoriteCityOffers } from '../../store/data-process/data-process.selectors';

export default function FavoritesSection(): React.JSX.Element {
  // const cities = new Set(favoriteOffers.map((offer) => offer.city.name));
  const cities = useSelector(getFavoriteCities);
  const cityOffers = useSelector(getFavoriteCityOffers);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoriteLocationsList cities={cities} cityOffers={cityOffers} />
    </section>
  );
}
