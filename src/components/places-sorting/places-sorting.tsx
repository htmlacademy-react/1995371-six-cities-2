import { useEffect, useRef } from 'react';
import { TSortActionMode, } from '../../types/sort';
import { updateSortType, updateCityOffersList } from '../../store/data-process/data-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isKnownSortName } from '../../utils/type-guard';
import { defaultSort, SORT_OPTIONS_OPEN_CLASSNAME, SortPack } from '../../const/sort';
import { ClassnameActionMode, SortActionMode } from '../../const/mode';
import { handleClassName } from '../../utils/utils';
import { getCurrentCity, getCurrentSortType } from '../../store/data-process/data-process.selectors';

export default function PlacesSorting(): React.JSX.Element {
  const sortOptionsListRef = useRef(null);

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);
  const currentSortType = useAppSelector(getCurrentSortType);

  useEffect(() => {
    dispatch(updateSortType(defaultSort));
    dispatch(updateCityOffersList());
  }, [currentCity, dispatch]);

  function handleSortOptionsList(action: TSortActionMode = SortActionMode.Close) {
    switch (action) {
      case SortActionMode.Open:
        handleClassName(sortOptionsListRef.current, SORT_OPTIONS_OPEN_CLASSNAME, ClassnameActionMode.Add);
        break;

      case SortActionMode.Close:
        handleClassName(sortOptionsListRef.current, SORT_OPTIONS_OPEN_CLASSNAME);
        break;
    }
  }

  function handleSortTypeClick() {
    handleSortOptionsList(SortActionMode.Open);
  }

  function handleSortItemClick(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const newSort = evt.currentTarget.dataset.sortName;

    if(!newSort || newSort === currentSortType || !isKnownSortName(newSort)) {
      return;
    }

    dispatch(updateSortType(newSort));
    dispatch(updateCityOffersList());
    handleSortOptionsList();
  }


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick}>
        {SortPack[currentSortType].Title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={sortOptionsListRef}>
        {Object.values(SortPack).map((sortItem) => {
          const sortOptionClassName = `places__option ${sortItem.Alias === currentSortType ? 'places__option--active' : ''}`;
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
