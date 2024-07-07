import classNames from 'classnames';
import { City, CityPackType } from '../../types/city';
import { isString } from '../../utils/utils';

type LocationsListProps = {
  cityPack: CityPackType;
  currentCity: City;
  onCityChange: (value: City) => void;
}

export default function LocationsList({cityPack, currentCity, onCityChange}: LocationsListProps): React.JSX.Element {
  const cities: City[] = Array.from(Object.values(cityPack));

  const isKnownCityName = (cityName: string | undefined): cityName is keyof CityPackType => {
    if (!isString(cityName)) {
      return isString(cityName);
    }

    return Object.keys(cityPack).some((city) => city === cityName);
  };

  const handleCityButtonClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.cityName;

    if (!isKnownCityName(cityName)) {
      return;
    }

    const city = cityPack[cityName];
    onCityChange(city);
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
