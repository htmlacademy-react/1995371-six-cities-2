import { TOffer, TOfferFull, TOffers } from '../../types/offers';
import { TReviews } from '../../types/reviews';

import { BookmarkButtonMode, PriceViewMode } from '../../const/mode';

import Gallery from './gallery/gallery';
import OfferMark from './offer-mark/offer-mark';
import BookmarkButton from '../shared/bookmark-button/bookmark-button';
import Rating from '../shared/rating/rating';
import FeaturesList from './features-list/features-list';
import OfferPrice from '../shared/offer-price/offer-price';
import GoodsInsideModule from './goods-inside-module/goods-inside-module';
import HostModule from './host-module/host-module';
import ReviewsSection from '../reviews-section/reviews-section';
import Map from '../ map/map';
import { getOffer } from '../../utils/offers-utils';

type PlaceOfferProps = {
  offers: TOffers;
  currentOffer: TOfferFull;
  nearbyOffers: TOffers;
  reviews: TReviews;
}

export default function PlaceOffer({
  offers,
  currentOffer,
  nearbyOffers,
  reviews
}: PlaceOfferProps): React.JSX.Element {
  const offerMark = currentOffer.isPremium ? <OfferMark /> : null;
  const goodsModule = currentOffer.goods.length > 0
    ? (<GoodsInsideModule goods={currentOffer.goods}/>)
    : null;

  const currentOfferShort = getOffer(offers, currentOffer.id) as TOffer;
  const points = [...nearbyOffers, currentOfferShort];
  const selectedPoints: TOffers = [currentOfferShort];

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <Gallery imageUrls={currentOffer.images}/>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offerMark}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{currentOffer.title}</h1>
            <BookmarkButton offer={currentOffer} bookmarkButtonMode={BookmarkButtonMode.Offer}/>
          </div>
          <Rating offerRating={currentOffer.rating}/>
          <FeaturesList
            accommodationType={currentOffer.type}
            bedroomsAmount={currentOffer.bedrooms}
            maxAdultsAmount={currentOffer.maxAdults}
          />
          <OfferPrice offerPrice={currentOffer.price} priceViewMode={PriceViewMode.Offer}/>
          {goodsModule}
          <HostModule offer={currentOffer}/>
          <ReviewsSection reviews={reviews}/>
        </div>
      </div>
      <section className="offer__map map">
        <Map city={currentOffer.city} points={points} selectedPoints={selectedPoints}/>
      </section>
    </section>
  );
}
