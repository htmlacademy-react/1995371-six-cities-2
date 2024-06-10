import { OfferShort } from '../../types/offers';

import { getInteger } from '../../utils';

type PlaceCardProps = {
  offer: OfferShort;
  onMouseOver: (id: string) => void;
}

export default function PlaceCard({offer, onMouseOver}: PlaceCardProps): React.JSX.Element {
  const bookmarkButtonClassName = `place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`;
  const ratingWidthValue = `${2 * getInteger(offer.rating)}0%`;

  const handleMouseOverEvent = (evt: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    evt.preventDefault();
    onMouseOver(offer.id);
  };

  return (
    <article
      className="cities__card place-card"
      onMouseOverCapture={handleMouseOverEvent}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidthValue}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
