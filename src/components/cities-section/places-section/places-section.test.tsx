import { render, screen } from '@testing-library/react';
import { getRandomCity, makeFakeShortOffer } from '../../../utils/mocks';
import PlacesSection from './places-section';

vi.mock('../../places-sorting/places-sorting', () => ({
  default: () => <div data-testid='mocked PlacesSorting'>Mocked places sorting</div>
}));

vi.mock('../../shared/places-list/places-list', () => ({
  default: () => <div data-testid='mocked PlacesList'>Mocked places list</div>
}));

describe('Component: PlacesSection', () => {
  it('Should render correctly', () => {
    const stubCity = getRandomCity();
    const stubCityOffers = [makeFakeShortOffer({city: stubCity}), makeFakeShortOffer({})];
    const stubMouseEventHandler = vi.fn();
    const expectedTitleText = 'Places';
    const expectedText = `${stubCityOffers.length} places to stay in ${stubCity.name}`;

    render(<PlacesSection cityOffers={stubCityOffers} currentCity={stubCity} isLoading={false} handleCardMouseEnter={stubMouseEventHandler} handleCardMouseLeave={stubMouseEventHandler} />);

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('mocked PlacesSorting')).toBeInTheDocument();
    expect(screen.getByTestId('mocked PlacesList')).toBeInTheDocument();
  });
});
