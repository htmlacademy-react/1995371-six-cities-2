import classNames from 'classnames';
import { TCity } from '../../../types/city';
import { memo } from 'react';

type LocationsListItemProps = {
  city: TCity;
  handleCityButtonClick: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isCurrent: boolean;
}

function LocationsListItem({city, handleCityButtonClick, isCurrent}: LocationsListItemProps) {
  return (
    <li className="locations__item">
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
}

const LocationsListItemMemo = memo(LocationsListItem);
export default LocationsListItemMemo;
