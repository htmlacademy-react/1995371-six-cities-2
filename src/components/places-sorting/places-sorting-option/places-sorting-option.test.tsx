import { render, screen } from '@testing-library/react';
import { SortPack } from '../../../utils/sort-utils';
import PlacesSortingOption from './places-sorting-option';
import userEvent from '@testing-library/user-event';

describe('Component: PlacesSortingOption', () => {
  const sortOptionTestid = 'sort option item';

  const stubDefaultSortType = SortPack.Popular.Alias;
  const stubSort = SortPack.ToLowerPrice;

  const stubOnClickFunction = vi.fn();

  it('Should render correctly', () => {
    render(
      <PlacesSortingOption
        sortItemAlias={stubSort.Alias}
        sortItemTitle={stubSort.Title}
        currentSortType={stubDefaultSortType}
        onClick={stubOnClickFunction}
      />
    );

    expect(screen.getByText(stubSort.Title)).toBeInTheDocument();
  });

  it('Should call onClick function when user clicks', async () => {
    render(
      <PlacesSortingOption
        sortItemAlias={stubSort.Alias}
        sortItemTitle={stubSort.Title}
        currentSortType={stubDefaultSortType}
        onClick={stubOnClickFunction}
      />
    );

    await userEvent.click(screen.getByTestId(sortOptionTestid));

    expect(stubOnClickFunction).toBeCalledTimes(1);
  });
});
