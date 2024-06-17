import { Link } from 'react-router-dom';

import { PlaceCardMode } from '../../types/common';
import { Offer } from '../../types/offers';

import { PlaceCardModeOption, AppRoute } from '../../const/const';
import Rating from '../shared/rating/rating';
import BookmarkButton from '../shared/bookmark-button/bookmark-button';
import OfferPrice from '../shared/offer-price/offer-price';

type PlaceCardProps = {
  offer: Offer;
  cardMode: PlaceCardMode;
  onMouseOver: (id: string) => void;
}

export default function PlaceCard({
  offer,
  cardMode,
  onMouseOver
}: PlaceCardProps): React.JSX.Element {
  const isFavoriteMode = cardMode === PlaceCardModeOption.Favorite;
  const classNamePrefix = isFavoriteMode ? 'favorites' : 'cities';

  const handleMouseOverEvent = (evt: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    evt.preventDefault();
    onMouseOver(offer.id);
  };

  return (
    <article
      className={`place-card ${classNamePrefix}__card`}
      onMouseOverCapture={!isFavoriteMode ? handleMouseOverEvent : undefined}
    >
      <div className={`place-card__image-wrapper ${classNamePrefix}__image-wrapper`}>
        <Link to={`${AppRoute.OfferBase}${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoriteMode ? '150' : '260'}
            height={isFavoriteMode ? '110' : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`place-card__info ${isFavoriteMode ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <OfferPrice offerPrice={offer.price} />
          <BookmarkButton offer={offer}/>
        </div>
        <Rating offerRating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OfferBase}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
