import { TCity, TCityPackType } from '../../types/city';
import { isKnownCityName } from '../../utils/type-guard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCurrentCity, updateCityOffersList } from '../../store/data-process/data-process.slice';
import { getCurrentCity } from '../../store/data-process/data-process.selectors';
import LocationsListItem from './locations-list-item/locations-list-item';
import { useCallback } from 'react';

type LocationsListProps = {
  cityPack: TCityPackType;
}

export default function LocationsList({cityPack}: LocationsListProps): React.JSX.Element {
  const cities: TCity[] = Array.from(Object.values(cityPack));
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  const handleCityButtonClick = useCallback((evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.cityName;

    if (!isKnownCityName(cityName) || cityName === currentCity.name) {
      return;
    }

    const city = cityPack[cityName];

    dispatch(updateCurrentCity(city));
    dispatch(updateCityOffersList());
  }, [cityPack, currentCity, dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        const isCurrent = (city.name === currentCity.name) && (city.location.latitude === currentCity.location.latitude);

        return (
          <LocationsListItem
            city={city}
            handleCityButtonClick={handleCityButtonClick}
            isCurrent={isCurrent}
            key={`${city.name}-${city.location.latitude}`}
          />
        );
      })}
    </ul>
  );
}
