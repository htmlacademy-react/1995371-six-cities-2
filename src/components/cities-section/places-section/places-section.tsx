import { memo } from 'react';
import { PlacesListWrapperClassName } from '../../../const/const';
import { TCity } from '../../../types/city';
import { TShortOffers } from '../../../types/offers';
import PlacesSorting from '../../places-sorting/places-sorting';
import PlacesList from '../../shared/places-list/places-list';

type PlacesSectionProps = {
  cityOffers: TShortOffers;
  currentCity: TCity;
  isLoading: boolean;
  handleCardMouseEnter: (newId?: string) => void;
  handleCardMouseLeave: (newId?: string) => void;
}

function PlacesSectionComponent({
  cityOffers,
  currentCity,
  isLoading,
  handleCardMouseEnter,
  handleCardMouseLeave
}: PlacesSectionProps) {

  return(
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
      <PlacesSorting />
      <PlacesList
        offers={cityOffers}
        className={PlacesListWrapperClassName.Main}
        isLoading={isLoading}
        onCardMouseEnter={handleCardMouseEnter}
        onCardMouseLeave={handleCardMouseLeave}
      />
    </section>
  );
}

const PlacesSection = memo(PlacesSectionComponent);

export default PlacesSection;
