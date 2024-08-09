import { render, screen } from '@testing-library/react';
import { PlaceCardMode } from '../../../../const/mode';
import { makeFakeShortOffer } from '../../../../utils/mocks';
import { withHistory } from '../../../../utils/mock-component';
import PlaceCard from './place-card';

const premiumMarkTestid = 'mocked PremiumMark';
const priceTestid = 'mocked OfferPrice';
const bookmarkButtonTestid = 'mocked BookmarkButton';
const ratingTestid = 'mocked Rating';

vi.mock('../../premium-mark/premium-mark', () => ({
  default: () => <div data-testid='mocked PremiumMark'>Mocked premium mark</div>
}));

vi.mock('../../offer-price/offer-price', () => ({
  default: () => <div data-testid='mocked OfferPrice'>Mocked offers&apos;s price</div>
}));

vi.mock('../../bookmark-button/bookmark-button', () => ({
  default: () => <div data-testid='mocked BookmarkButton'>Mocked bookmark button</div>
}));

vi.mock('../../rating/rating', () => ({
  default: () => <div data-testid='mocked Rating'>Mocked rating</div>
}));

describe('Component: PlaceCard', () => {
  const cardTestid = 'place card element';
  const imageTestid = 'card image';
  const infoTestid = 'card info element';
  const titleTestid = 'card title';
  const typeTestid = 'card type';

  const stubMouseEventHandler = vi.fn();
  const defaultInfoClassname = 'place-card__info';
  const favoriteInfoClassname = 'place-card__info favorites__card-info';

  it('Should render correctly in case of default place card mode and premium offer, ', () => {
    const cardMode = PlaceCardMode.Default;
    const stubOffer = {
      ...makeFakeShortOffer({}),
      isPremium: true
    };
    const expectedCardClassname = 'place-card cities__card';
    const preparedComponent = withHistory(<PlaceCard offer={stubOffer} cardMode={cardMode} onMouseEnter={stubMouseEventHandler} onMouseLeave={stubMouseEventHandler} />);

    render(preparedComponent);
    expect(screen.getByTestId(cardTestid).className).toBe(expectedCardClassname);
    expect(screen.getByTestId(imageTestid).getAttribute('src')).toBe(stubOffer.previewImage);
    expect(screen.getByTestId(infoTestid).className).toBe(defaultInfoClassname);
    expect(screen.getByTestId(premiumMarkTestid)).toBeInTheDocument();
    expect(screen.getByTestId(priceTestid)).toBeInTheDocument();
    expect(screen.getByTestId(bookmarkButtonTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestid)).toBeInTheDocument();
    expect(screen.getByTestId(titleTestid).textContent).toBe(stubOffer.title);
    expect(screen.getByTestId(typeTestid).textContent).toBe(stubOffer.type);
  });

  it('Should render correctly in case of default place card mode and premium offer, ', () => {
    const cardMode = PlaceCardMode.Favorite;
    const stubOffer = {
      ...makeFakeShortOffer({}),
      isPremium: false
    };
    const expectedCardClassname = 'place-card favorites__card';
    const preparedComponent = withHistory(<PlaceCard offer={stubOffer} cardMode={cardMode} onMouseEnter={stubMouseEventHandler} onMouseLeave={stubMouseEventHandler} />);

    render(preparedComponent);
    expect(screen.getByTestId(cardTestid).className).toBe(expectedCardClassname);
    expect(screen.getByTestId(imageTestid).getAttribute('src')).toBe(stubOffer.previewImage);
    expect(screen.getByTestId(infoTestid).className).toBe(favoriteInfoClassname);
    expect(screen.queryByTestId(premiumMarkTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(priceTestid)).toBeInTheDocument();
    expect(screen.getByTestId(bookmarkButtonTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestid)).toBeInTheDocument();
    expect(screen.getByTestId(titleTestid).textContent).toBe(stubOffer.title);
    expect(screen.getByTestId(typeTestid).textContent).toBe(stubOffer.type);
  });
});
