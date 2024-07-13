import { useEffect, useRef } from 'react';
import { SortActionMode, } from '../../types/sort';
import { updateSortType, updateCityOffersList } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isKnownSortName } from '../../utils/type-quard';
import { defaultSort, SORT_OPTIONS_OPEN_CLASSNAME, SortPack } from '../../const/sort';
import { ClassnameActionModeOption, SortActionModeOption } from '../../const/mode';
import { handleClassName } from '../../utils/utils';

export default function PlacesSorting(): React.JSX.Element {
  const sortOptionsListRef = useRef(null);

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);
  const currentSortType = useAppSelector((state) => state.sortType);

  useEffect(() => {
    dispatch(updateSortType({newSort: defaultSort}));
    dispatch(updateCityOffersList());
  }, [currentCity, dispatch]);

  function handleSortOptionsList(action: SortActionMode = SortActionModeOption.Close) {
    switch (action) {
      case SortActionModeOption.Open:
        handleClassName(sortOptionsListRef.current, SORT_OPTIONS_OPEN_CLASSNAME, ClassnameActionModeOption.Add);
        break;

      case SortActionModeOption.Close:
        handleClassName(sortOptionsListRef.current, SORT_OPTIONS_OPEN_CLASSNAME);
        break;
    }
  }

  function handleSortTypeClick() {
    handleSortOptionsList(SortActionModeOption.Open);
  }

  function handleSortItemClick(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const newSort = evt.currentTarget.dataset.sortName;

    if(!newSort || newSort === currentSortType || !isKnownSortName(newSort)) {
      return;
    }

    dispatch(updateSortType({newSort}));
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
