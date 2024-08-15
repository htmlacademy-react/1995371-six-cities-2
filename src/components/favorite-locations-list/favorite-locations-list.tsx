import { TShortOffers } from '../../types/offers';
import FavoriteLocationItem from './favorite-location-item/favorite-location-item';

type FavoriteLocationsListProps = {
  cities: Set<string>;
  cityOffers: Map<string, TShortOffers>;
}

export default function FavoriteLocationsList({cities, cityOffers}: FavoriteLocationsListProps): React.JSX.Element {
  const locationItemsLists = Array.from(cities)
    .map((city) => {
      const filteredOffers = cityOffers.get(city);
      if (!filteredOffers) {
        return;
      }

      return (
        <FavoriteLocationItem key={city} cityName={city} filteredOffers={filteredOffers}/>
      );

    })
    .filter((element) => !!element);

  return (
    <ul className="favorites__list" data-testid='favorites list element'>
      {locationItemsLists}
    </ul>
  );
}
