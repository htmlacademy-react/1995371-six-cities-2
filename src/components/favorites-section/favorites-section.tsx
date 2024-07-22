import { TOffers } from '../../types/offers';
import { getCityFilteredOffers } from '../../utils/filter-utils';
import FavoriteLocationsList from '../favorite-locations-list/favorite-locations-list';

type FavoritesSectionProps = {
  favoriteOffers: TOffers;
}

export default function FavoritesSection({favoriteOffers}: FavoritesSectionProps): React.JSX.Element {
  const cities = new Set(favoriteOffers.map((offer) => offer.city.name));
  const cityOffers = new Map<string, TOffers>();

  cities.forEach((city) => cityOffers.set(
    city,
    getCityFilteredOffers(favoriteOffers, city)
  ));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoriteLocationsList cities={cities} cityOffers={cityOffers} />
    </section>
  );
}
