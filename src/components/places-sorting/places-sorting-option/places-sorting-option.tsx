import { TSortName } from '../../../types/sort';

type PlacesSortingOptionProps = {
  sortItemAlias: TSortName;
  sortItemTitle: string;
  currentSortType: TSortName;
  onClick: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export default function PlacesSortingOption({
  sortItemAlias,
  sortItemTitle,
  currentSortType,
  onClick
}: PlacesSortingOptionProps) {
  const sortOptionClassName = `places__option ${sortItemAlias === currentSortType ? 'places__option--active' : ''}`;
  return (
    <li
      key={sortItemAlias}
      className={sortOptionClassName}
      data-sort-name={sortItemAlias}
      tabIndex={0}
      onClick={onClick}
      data-testid='sort option item'
    >
      {sortItemTitle}
    </li>
  );
}
