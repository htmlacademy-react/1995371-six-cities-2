import { render, screen } from '@testing-library/react';
import { StoreNameSpace } from '../../const/store';
import { withStore } from '../../utils/mock-component';
import { makeFakeStoreState } from '../../utils/mocks';
import CitiesSection from './cities-section';

const mockPlacesTestid = 'mocked PlacesSection';
vi.mock('./places-section/places-section', () => ({
  default: () => <div data-testid={mockPlacesTestid}>Mocked places section</div>
}));

const mockEmptyPlacesTestid = 'mocked PlacesSectionEmpty';
vi.mock('./places-section/places-section-empty', () => ({
  default: () => <div data-testid={mockEmptyPlacesTestid}>Mocked empty places section</div>
}));

const mockMapTestid = 'mocked Map';
vi.mock('../map/map', () => ({
  default: () => <div data-testid={mockMapTestid}>Mocked map</div>
}));

describe('Component: CitiesSection', () => {
  const containerTestid = 'cities section container';

  const defaultContainerClassname = 'cities__places-container container';
  const emptyContainerClassname = 'cities__places-container--empty';

  const initialState = makeFakeStoreState();

  it('Should render correctly in case of 0 cityOffers', () => {
    const stubState = {
      ...initialState,
      [StoreNameSpace.Data]: {
        ...initialState.data,
        cityOffers: []
      }
    };

    const { withStoreComponent } = withStore(<CitiesSection />, stubState);
    render(withStoreComponent);

    expect(screen.getByTestId(containerTestid).className).toBe(`${defaultContainerClassname} ${emptyContainerClassname}`);
    expect(screen.getByTestId(mockEmptyPlacesTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(mockPlacesTestid)).not.toBeInTheDocument();
    expect(screen.queryByTestId(mockMapTestid)).not.toBeInTheDocument();
  });

  it('Should render correctly in case of cityOffers', () => {
    const { withStoreComponent } = withStore(<CitiesSection />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(containerTestid).className).toBe(defaultContainerClassname);
    expect(screen.queryByTestId(mockEmptyPlacesTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(mockPlacesTestid)).toBeInTheDocument();
    expect(screen.getByTestId(mockMapTestid)).toBeInTheDocument();
  });
});
