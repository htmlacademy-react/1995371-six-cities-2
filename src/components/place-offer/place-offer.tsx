import { Offer, Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';

import { BookmarkButtonModeOption, PriceViewModeOption } from '../../const/mode';

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

type PlaceOfferProps = {
  currentOffer: Offer;
  nearbyOffers: Offers;
  hoveredCardOffer: Offer | undefined;
  reviews: Reviews;
}

export default function PlaceOffer({
  currentOffer,
  nearbyOffers,
  hoveredCardOffer,
  reviews
}: PlaceOfferProps): React.JSX.Element {
  const offerMark = currentOffer.isPremium ? <OfferMark /> : null;
  const goodsModule = currentOffer.goods.length > 0
    ? (<GoodsInsideModule goods={currentOffer.goods}/>)
    : null;

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
            <BookmarkButton offer={currentOffer} bookmarkButtonMode={BookmarkButtonModeOption.Offer}/>
          </div>
          <Rating offerRating={currentOffer.rating}/>
          <FeaturesList
            accommodationType={currentOffer.type}
            bedroomsAmount={currentOffer.bedrooms}
            maxAdultsAmount={currentOffer.maxAdults}
          />
          <OfferPrice offerPrice={currentOffer.price} priceViewMode={PriceViewModeOption.Offer}/>
          {goodsModule}
          <HostModule offer={currentOffer}/>
          <ReviewsSection offerId={currentOffer.id} reviews={reviews}/>
        </div>
      </div>
      <section className="offer__map map">
        <Map city={currentOffer.city} points={nearbyOffers} selectedPoint={hoveredCardOffer}/>
      </section>
    </section>
  );
}
