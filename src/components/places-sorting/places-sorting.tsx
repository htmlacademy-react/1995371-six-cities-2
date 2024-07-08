import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isString } from '../../utils/utils';
import { resetOffersList, updateOffersList } from '../../store/action';
import { SortPack } from '../../const/sortpack';
import { SortName } from '../../types/sort';

const isKnownSortName = (sortName: string | undefined): sortName is SortName => {
  if (!isString(sortName)) {
    return isString(sortName);
  }

  return Object.keys(SortPack).some((sort) => sort === sortName);
};

export default function PlacesSorting(): React.JSX.Element {
  const defaultSort: string = SortPack.Popular.Alias;
  const [activeSort, setActiveSort] = useState(defaultSort);
  const dispatch = useAppDispatch();
  const cityOffers = useAppSelector((state) => state.offers);

  function handleSortItemClick(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const newSort = evt.currentTarget.dataset.sortName;

    if(!newSort || newSort === activeSort || !isKnownSortName(newSort)) {
      return;
    }

    switch (newSort) {
      case SortPack.Popular.Alias:
        dispatch(resetOffersList());
        break;

      default:
        dispatch(updateOffersList({newOffers: SortPack[newSort].SortFunction(cityOffers)}));
        break;
    }
    setActiveSort(newSort);
  }


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.values(SortPack).map((sortItem) => {
          const sortOptionClassName = `places__option ${sortItem.Alias === activeSort ? 'places__option--active' : ''}`;
          return (
            <li
              key={sortItem.Alias}
              className={sortOptionClassName}
              data-sort-name={sortItem.Alias}
              tabIndex={0}
              onClick={handleSortItemClick}
            >
              {sortItem.Title}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
