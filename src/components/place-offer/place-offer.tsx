import { Accommodation, Offer, Offers } from '../../types/offers';

import { BookmarkButtonModeOption, PriceViewModeOption } from '../../const';
import Rating from '../shared/rating/rating';
import BookmarkButton from '../shared/bookmark-button/bookmark-button';
import OfferPrice from '../shared/offer-price/offer-price';
import ReviewsSection from '../reviews-section/reviews-section';

type PlaceOfferProps = {
  offers: Offers;
  currentOfferId: string;
}

type GalleryProps = {
  imageUrls: string[];
}

function Gallery({imageUrls}: GalleryProps): React.JSX.Element {
  return (
    <div className="offer__gallery">
      {imageUrls.map((url) => (
        <div className="offer__image-wrapper" key={url}>
          <img className="offer__image" src={url} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

function OfferMark(): React.JSX.Element {
  return(
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  );
}

type FeaturesListProps = {
  accommodationType: Accommodation;
  bedroomsAmount: number;
  maxAdultsAmount: number;
}

function FeaturesList({
  accommodationType,
  bedroomsAmount,
  maxAdultsAmount
}: FeaturesListProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire" key="accommodationType">{accommodationType}</li>
      <li className="offer__feature offer__feature--bedrooms" key="bedroomsAmount">{`${bedroomsAmount} ${bedroomsAmount === 1 ? 'Bedroom' : 'Bedrooms'}`}</li>
      <li className="offer__feature offer__feature--adults" key="maxAdultsAmount">{`Max ${maxAdultsAmount} ${maxAdultsAmount === 1 ? 'adult' : 'adults'}`}</li>
    </ul>
  );
}


type GoodsListProps = {
  goods: string[];
}

function GoodsList({goods}: GoodsListProps): React.JSX.Element {
  return (
    <ul className="offer__inside-list">
      {goods.map((goodsItem) => (<li className="offer__inside-item" key={goodsItem}>{goodsItem}</li>))}
    </ul>
  );
}

type GoodsInsideModuleProps = {
  goods: string[];
}

function GoodsInsideModule({goods}: GoodsInsideModuleProps): React.JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <GoodsList goods={goods}/>
    </div>
  );
}

type HostModuleProps = {
  offer: Offer;
}

function HostModule({offer}: HostModuleProps): React.JSX.Element {
  const hostStatus = offer.host.isPro ? (<span className="offer__user-status">Pro</span>) : null;
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">{offer.host.name}</span>
        {hostStatus}
      </div>
      <div className="offer__description">
        <p className="offer__text">{offer.description}</p>
      </div>
    </div>
  );
}

export default function PlaceOffer({
  offers,
  currentOfferId
}: PlaceOfferProps): React.JSX.Element {
  const currentOffer = offers.find((offer) => offer.id === currentOfferId) as Offer;
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
          <ReviewsSection offerId={currentOffer.id}/>
        </div>
      </div>
      <section className="offer__map map"></section>
    </section>
  );
}
