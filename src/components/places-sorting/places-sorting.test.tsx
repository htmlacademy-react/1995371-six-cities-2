import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import PlacesSorting from './places-sorting';
import { SORT_OPTIONS_OPEN_CLASSNAME, SortPack } from '../../utils/sort-utils';
import { makeFakeStoreState } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockPlacesSortOptionTestid = 'mocked PlacesSortOption';
vi.mock('./places-sorting-option/places-sorting-option', () => ({
  default: () => <div data-testid={mockPlacesSortOptionTestid}>Mocked places sort option</div>
}));

describe('Component: PlacesSorting', () => {
  const sortOptions = Object.keys(SortPack);
  const initialState = makeFakeStoreState();

  const sortOptionsListTestid = 'sort options list';
  const sortTitleElementTestid = 'sort type title';

  const defaultOptionsListClassname = 'places__options places__options--custom';
  const openOptionsListClassname = SORT_OPTIONS_OPEN_CLASSNAME;

  it('Should render correctly', () => {
    const expectedText = 'Sort by';
    const expectedSortTitle = SortPack[initialState.data.sortType].Title;
    const {withStoreComponent} = withStore(<PlacesSorting />, initialState);
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedSortTitle)).toBeInTheDocument();
    expect(screen.getAllByTestId(mockPlacesSortOptionTestid).length).toBe(sortOptions.length);
  });

  it('Should call handleSortTypeClick function when user clicks sorting type element', async () => {
    const {withStoreComponent} = withStore(<PlacesSorting />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(sortOptionsListTestid).className).toBe(defaultOptionsListClassname);

    await userEvent.click(screen.getByTestId(sortTitleElementTestid));

    expect(screen.getByTestId(sortOptionsListTestid).className).toBe(`${defaultOptionsListClassname} ${openOptionsListClassname}`);
  });
});
