import classNames from 'classnames';
import { City, CityPackType } from '../../types/city';

type LocationsListProps = {
  cityPack: CityPackType;
  currentCity: City;
}

export default function LocationsList({cityPack, currentCity}: LocationsListProps): React.JSX.Element {
  const cities: City[] = Array.from(Object.values(cityPack));

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
            >
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
