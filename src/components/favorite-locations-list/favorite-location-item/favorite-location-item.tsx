import { PlacesListWrapperClassName } from '../../../const/const';
import { PlaceCardMode } from '../../../const/mode';
import { TShortOffers } from '../../../types/offers';
import PlacesList from '../../shared/places-list/places-list';
type FavoriteLocationItemProps = {
  city: string;
  filteredOffers: TShortOffers;
}

export default function FavoriteLocationItem({city, filteredOffers}: FavoriteLocationItemProps): React.JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <PlacesList
        offers={filteredOffers}
        className={PlacesListWrapperClassName.Favorite}
        cardMode={PlaceCardMode.Favorite}
      />
    </li>
  );
}
