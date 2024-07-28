import classNames from 'classnames';
import { TCity, TCityPackType } from '../../types/city';
import { isKnownCityName } from '../../utils/type-guard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCurrentCity, updateCityOffersList } from '../../store/data-process/data-process.slice';
import { getCurrentCity } from '../../store/data-process/data-process.selectors';

type LocationsListProps = {
  cityPack: TCityPackType;
}

export default function LocationsList({cityPack}: LocationsListProps): React.JSX.Element {
  const cities: TCity[] = Array.from(Object.values(cityPack));
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  const handleCityButtonClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.cityName;

    if (!isKnownCityName(cityName)) {
      return;
    }

    const city = cityPack[cityName];

    if (city.name === currentCity.name) {
      return;
    }

    dispatch(updateCurrentCity(city));
    dispatch(updateCityOffersList());
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        const isCurrent = (city.name === currentCity.name) && (city.location.latitude === currentCity.location.latitude);

        return (
          <li className="locations__item" key={`${city.name}-${city.location.latitude}`}>
            <a
              className={classNames(
                'locations__item-link tabs__item',
                {'tabs__item--active': isCurrent}
              )}
              href="#"
              data-city-name={city.name}
              onClickCapture={handleCityButtonClick}
            >
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
