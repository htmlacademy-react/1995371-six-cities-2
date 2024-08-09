import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MainScreen from './main-screen';
import { CityPack } from '../../const/citypack';
import { makeFakeStoreState } from '../../utils/mocks';
import { StoreNameSpace } from '../../const/store';

const locationsListTestid = 'mocked LocationsList';
const citiesSectionTestid = 'mocked CitiesSection';

vi.mock('../../components/locations-list/locations-list', () => ({
  default: () => <div data-testid='mocked LocationsList'>Mocked locations list</div>
}));

vi.mock('../../components/cities-section/cities-section', () => ({
  default: () => <div data-testid='mocked CitiesSection'>Mocked cities section</div>
}));

describe('Component: MainScreen', () => {
  const mainElementTestid = 'main element';
  const screenTitleElementTestid = 'screen title element';
  const initialState = makeFakeStoreState();
  const defaultMainClassname = 'page__main page__main--index';
  const emptyOffersMainClassname = 'page__main--index-empty';
  const titleText = 'Cities';

  it('Should render correctly in case of offers', () => {
    const { withStoreComponent } = withStore(<MainScreen cityPack={CityPack} />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(mainElementTestid).className).toBe(defaultMainClassname);
    expect(screen.getByTestId(screenTitleElementTestid).textContent).toBe(titleText);
    expect(screen.getByTestId(locationsListTestid)).toBeInTheDocument();
    expect(screen.getByTestId(citiesSectionTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of empty city offers', () => {
    const expectedClassname = `${defaultMainClassname} ${emptyOffersMainClassname}`;
    const stubState = {
      ...initialState,
      [StoreNameSpace.Data]: {
        ...initialState.data,
        cityOffers: []
      }
    };
    const { withStoreComponent } = withStore(<MainScreen cityPack={CityPack} />, stubState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(mainElementTestid).className).toBe(expectedClassname);
    expect(screen.getByTestId(screenTitleElementTestid).textContent).toBe(titleText);
    expect(screen.getByTestId(locationsListTestid)).toBeInTheDocument();
    expect(screen.getByTestId(citiesSectionTestid)).toBeInTheDocument();
  });
});
