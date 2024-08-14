import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeShortOffer } from '../../utils/mocks';
import PlaceOffer from './place-offer';

const galleryTestid = 'mocked Gallery';
const premiumMarkTestid = 'mocked PremiumMark';
const bookmarkButtonTestid = 'mocked BookmarkButton';
const ratingTestid = 'mocked Rating';
const featuresTestid = 'mocked FeaturesList';
const priceTestid = 'mocked OfferPrice';
const goodsTestid = 'mocked GoodsInsideModule';
const hostTestid = 'mocked HostModule';
const reviewsTestid = 'mocked ReviewsSection';
const mapTestid = 'mocked Map';

vi.mock('./gallery/gallery', () => ({
  default: () => <div data-testid='mocked Gallery'>Mocked gallery</div>
}));

vi.mock('../shared/premium-mark/premium-mark', () => ({
  default: () => <div data-testid='mocked PremiumMark'>Mocked premium mark</div>
}));

vi.mock('../shared/bookmark-button/bookmark-button', () => ({
  default: () => <div data-testid='mocked BookmarkButton'>Mocked bookmark button</div>
}));

vi.mock('../shared/rating/rating', () => ({
  default: () => <div data-testid='mocked Rating'>Mocked rating</div>
}));

vi.mock('./features-list/features-list', () => ({
  default: () => <div data-testid='mocked FeaturesList'>Mocked features list</div>
}));

vi.mock('../shared/offer-price/offer-price', () => ({
  default: () => <div data-testid='mocked OfferPrice'>Mocked offers&apos;s price</div>
}));

vi.mock('./goods-inside-module/goods-inside-module', () => ({
  default: () => <div data-testid='mocked GoodsInsideModule'>Mocked goods list</div>
}));

vi.mock('./host-module/host-module', () => ({
  default: () => <div data-testid='mocked HostModule'>Mocked host info</div>
}));

vi.mock('../reviews-section/reviews-section', () => ({
  default: () => <div data-testid='mocked ReviewsSection'>Mocked location item</div>
}));

vi.mock('../map/map', () => ({
  default: () => <div data-testid='mocked Map'>Mocked map</div>
}));

describe('Component: PlaceOffer', () => {
  const stubNearbyOffers = [makeFakeShortOffer({})];

  it('Should render correctly in case of premium offer with goods in place', () => {
    const stubShortCurrentOffer = {
      ...makeFakeShortOffer({}),
      isPremium: true
    };

    const stubOffers = [
      stubShortCurrentOffer,
      makeFakeShortOffer({})
    ];

    const stubCurrentOffer = {
      ...makeFakeOffer({shortOffer: stubShortCurrentOffer}),
      goods: ['kettle']
    };

    render(<PlaceOffer offers={stubOffers} currentOffer={stubCurrentOffer} nearbyOffers={stubNearbyOffers} />);

    expect(screen.getByText(stubCurrentOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId(galleryTestid)).toBeInTheDocument();
    expect(screen.getByTestId(premiumMarkTestid)).toBeInTheDocument();
    expect(screen.getByTestId(bookmarkButtonTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestid)).toBeInTheDocument();
    expect(screen.getByTestId(featuresTestid)).toBeInTheDocument();
    expect(screen.getByTestId(priceTestid)).toBeInTheDocument();
    expect(screen.getByTestId(goodsTestid)).toBeInTheDocument();
    expect(screen.getByTestId(hostTestid)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsTestid)).toBeInTheDocument();
    expect(screen.getByTestId(mapTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of not premium offer without goods in place', () => {
    const stubShortCurrentOffer = {
      ...makeFakeShortOffer({}),
      isPremium: false
    };

    const stubOffers = [
      stubShortCurrentOffer,
      makeFakeShortOffer({})
    ];

    const stubCurrentOffer = {
      ...makeFakeOffer({shortOffer: stubShortCurrentOffer}),
      goods: []
    };

    render(<PlaceOffer offers={stubOffers} currentOffer={stubCurrentOffer} nearbyOffers={stubNearbyOffers} />);

    expect(screen.getByText(stubCurrentOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId(galleryTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(premiumMarkTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(bookmarkButtonTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestid)).toBeInTheDocument();
    expect(screen.getByTestId(featuresTestid)).toBeInTheDocument();
    expect(screen.getByTestId(priceTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(goodsTestid)).not.toBeInTheDocument();
    expect(screen.getByTestId(hostTestid)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsTestid)).toBeInTheDocument();
    expect(screen.getByTestId(mapTestid)).toBeInTheDocument();
  });
});
