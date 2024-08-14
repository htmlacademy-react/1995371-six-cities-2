import { render, screen } from '@testing-library/react';
import { getRandomCity } from '../../../utils/mocks';
import LocationsListItem from './locations-list-item';
import userEvent from '@testing-library/user-event';

describe('Component: LocationsListItem', () => {
  const stubCity = getRandomCity();
  const stubHandleCityButtonClickFunction = vi.fn();
  const isNotCurrentClassName = 'locations__item-link tabs__item';
  const isCurrentClassName = `${isNotCurrentClassName} tabs__item--active`;
  const locationItemLinkTestid = 'locationsListItem link';

  it('Should render correctly in case of is current', () => {
    render(<LocationsListItem city={stubCity} handleCityButtonClick={stubHandleCityButtonClickFunction} isCurrent />);
    expect(screen.getByTestId(locationItemLinkTestid)).toBeInTheDocument();
    expect(screen.getByTestId(locationItemLinkTestid).className).toBe(isCurrentClassName);
    expect(screen.getByText(stubCity.name)).toBeInTheDocument();
  });

  it('Should render correctly in case of is not current', () => {
    render(<LocationsListItem city={stubCity} handleCityButtonClick={stubHandleCityButtonClickFunction} isCurrent={false} />);
    expect(screen.getByTestId(locationItemLinkTestid)).toBeInTheDocument();
    expect(screen.getByTestId(locationItemLinkTestid).className).toBe(isNotCurrentClassName);
    expect(screen.getByText(stubCity.name)).toBeInTheDocument();
  });

  it('Should call onClick function when user clicks', async () => {
    render(<LocationsListItem city={stubCity} handleCityButtonClick={stubHandleCityButtonClickFunction} isCurrent={false} />);

    await userEvent.click(screen.getByTestId(locationItemLinkTestid));

    expect(stubHandleCityButtonClickFunction).toBeCalledTimes(1);
  });
});
