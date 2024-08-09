import { render, screen } from '@testing-library/react';
import PlacesList from './places-list';
import { makeFakeShortOffer } from '../../../utils/mocks';
import { TShortOffers } from '../../../types/offers';

const placeCardTestid = 'mocked PlaceCard';
vi.mock('./place-card/place-card', () => ({
  default: () => <div data-testid='mocked PlaceCard'>Mocked place card</div>
}));

describe('Component: PlacesList', () => {
  const containerTestid = 'places list container';
  const stubClassname = 'test classname';
  const spinnerText = 'Ищем лучшие варианты';

  it('Should render correctly in case of is loading', () => {
    const stubOffers: TShortOffers = [];
    render(<PlacesList offers={stubOffers} className={stubClassname} isLoading/>);

    expect(screen.getByTestId(containerTestid).className).toBe(stubClassname);
    expect(screen.getByText(spinnerText)).toBeInTheDocument();
    expect(screen.queryAllByTestId(placeCardTestid).length).toBe(stubOffers.length);
  });

  it('Should render correctly in case of is not loading and empty offers', () => {
    const stubOffers: TShortOffers = [];
    render(<PlacesList offers={stubOffers} className={stubClassname} isLoading={false} />);

    expect(screen.getByTestId(containerTestid).className).toBe(stubClassname);
    expect(screen.queryByText(spinnerText)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(placeCardTestid).length).toBe(stubOffers.length);
  });

  it('Should render correctly in case of is not loading', () => {
    const stubOffers = [makeFakeShortOffer({}), makeFakeShortOffer({}), makeFakeShortOffer({})];
    render(<PlacesList offers={stubOffers} className={stubClassname} isLoading={false} />);

    expect(screen.getByTestId(containerTestid).className).toBe(stubClassname);
    expect(screen.queryByText(spinnerText)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(placeCardTestid).length).toBe(stubOffers.length);
  });
});
