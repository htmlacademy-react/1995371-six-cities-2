import { useEffect, useRef } from 'react';
import { TSortActionMode, } from '../../types/sort';
import { updateSortType, updateCityOffersList } from '../../store/data-process/data-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isKnownSortName } from '../../utils/type-guard';
import { defaultSort, SORT_OPTIONS_OPEN_CLASSNAME, SortPack } from '../../utils/sort-utils';
import { ClassnameActionMode, SortActionMode } from '../../const/mode';
import { handleClassName } from '../../utils/utils';
import { getCurrentCity, getCurrentSortType } from '../../store/data-process/data-process.selectors';
import PlacesSortingOption from './places-sorting-option/places-sorting-option';

export default function PlacesSorting(): React.JSX.Element {
  const sortOptionsListRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);
  const currentSortType = useAppSelector(getCurrentSortType);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(updateSortType(defaultSort));
      dispatch(updateCityOffersList());
    }

    return () => {
      isMounted = false;
    };
  }, [currentCity, dispatch]);

  function handleSortOptionsList(action: TSortActionMode = SortActionMode.Close) {
    if (sortOptionsListRef.current) {
      handleClassName(
        sortOptionsListRef.current,
        SORT_OPTIONS_OPEN_CLASSNAME,
        action === SortActionMode.Open
          ? ClassnameActionMode.Add
          : ClassnameActionMode.Remove
      );
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
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick} data-testid='sort type title'>
        {SortPack[currentSortType].Title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={sortOptionsListRef} data-testid='sort options list'>
        {Object.values(SortPack).map((sortItem) => (
          <PlacesSortingOption
            key={sortItem.Alias}
            sortItemAlias={sortItem.Alias}
            sortItemTitle={sortItem.Title}
            currentSortType={currentSortType}
            onClick={handleSortItemClick}
          />
        )
        )}
      </ul>
    </form>
  );
}
