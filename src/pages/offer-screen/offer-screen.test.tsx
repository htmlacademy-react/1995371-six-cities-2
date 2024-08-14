import { render, screen } from '@testing-library/react';
import { StoreNameSpace } from '../../const/store';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStoreState } from '../../utils/mocks';
import OfferScreen from './offer-screen';
import { AppRoute } from '../../const/const';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';

const mockHeaderTestid = 'mocked Header';
vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid={mockHeaderTestid}>Mocked header</div>
}));

const mockPlaceOfferTestid = 'mocked PlaceOffer';
vi.mock('../../components/place-offer/place-offer', () => ({
  default: () => <div data-testid={mockPlaceOfferTestid}>Mocked place offer</div>
}));

const mockPlacesListTestid = 'mocked PlacesList';
vi.mock('../../components/shared/places-list/places-list', () => ({
  default: () => <div data-testid={mockPlacesListTestid}>Mocked places list</div>
}));

describe('Component: OfferScreen', () => {
  const screenMainTestid = 'offerScreen main element';
  const nearPlacesTitleText = 'Other places in the neighbourhood';
  const spinnerText = 'Загружаем информацию о предложении';
  const initialState = makeFakeStoreState();
  const currentId = initialState.data.currentOffer?.id as string;
  const pageMainText = 'Main page';
  const page404Text = 'Page 404';

  const mockHistory: MemoryHistory = createMemoryHistory();
  const route = `${AppRoute.OfferBase}/${currentId}`;

  beforeEach(() => {
    mockHistory.push(route);
  });

  it('Should render correctly in case of the absence of information', () => {
    const stubState = {
      ...initialState,
      [StoreNameSpace.Data]: {
        ...initialState.data,
        currentOffer: null,
        nearbyOffers: []
      }
    };

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Main} element={<div>{pageMainText}</div>} />
        <Route path={AppRoute.Page404} element={<div>{page404Text}</div>} />
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
      </Routes>,
      stubState
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    expect(screen.getByTestId(mockHeaderTestid)).toBeInTheDocument();
    expect(screen.getByTestId(screenMainTestid)).toBeInTheDocument();
    expect(screen.getByText(spinnerText)).toBeInTheDocument();
    expect(screen.queryByTestId(mockPlaceOfferTestid)).not.toBeInTheDocument();
    expect(screen.queryByText(nearPlacesTitleText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(mockPlacesListTestid)).not.toBeInTheDocument();
  });

  it('Should render correctly in case of information', () => {
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Main} element={<div>{pageMainText}</div>} />
        <Route path={AppRoute.Page404} element={<div>{page404Text}</div>} />
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
      </Routes>,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    expect(screen.getByTestId(mockHeaderTestid)).toBeInTheDocument();
    expect(screen.getByTestId(screenMainTestid)).toBeInTheDocument();
    expect(screen.queryByText(spinnerText)).not.toBeInTheDocument();
    expect(screen.getByTestId(mockPlaceOfferTestid)).toBeInTheDocument();
    expect(screen.getByText(nearPlacesTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(mockPlacesListTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of no currentOfferId in route', () => {
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Main} element={<div>{pageMainText}</div>} />
        <Route path={AppRoute.Page404} element={<div>{page404Text}</div>} />
        <Route path={`${AppRoute.OfferBase}/*`} element={<OfferScreen />} />
      </Routes>,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(`${AppRoute.OfferBase}/`);
    render(preparedComponent);

    expect(screen.getByText(page404Text)).toBeInTheDocument();
    expect(screen.queryByTestId(mockHeaderTestid)).not.toBeInTheDocument();
    expect(screen.queryByTestId(screenMainTestid)).not.toBeInTheDocument();
    expect(screen.queryByText(spinnerText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(mockPlaceOfferTestid)).not.toBeInTheDocument();
    expect(screen.queryByText(nearPlacesTitleText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(mockPlacesListTestid)).not.toBeInTheDocument();
  });
});
