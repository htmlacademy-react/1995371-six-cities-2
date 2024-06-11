import { Accommodation, Offer, Offers } from '../../types/offers';

import { BookmarkButtonModeOption, PriceViewModeOption } from '../../const';
import Rating from '../shared/rating/rating';
import BookmarkButton from '../shared/bookmark-button/bookmark-button';
import OfferPrice from '../shared/offer-price/offer-price';

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

function ReviewForm() {
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

function ReviewsSection() {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        <li className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
            </div>
            <span className="reviews__user-name">
              Max
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{width: '80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
            </p>
            <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
          </div>
        </li>
      </ul>
      <ReviewForm />
    </section>
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
          <ReviewsSection />
        </div>
      </div>
      <section className="offer__map map"></section>
    </section>
  );
}
