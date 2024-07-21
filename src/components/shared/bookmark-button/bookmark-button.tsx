import { TBookmarkButtonMode } from '../../../types/common';
import { TOfferBase } from '../../../types/offers';

import { BookmarkButtonMode } from '../../../const/mode';

type BookmarkButtonProps = {
  offer: TOfferBase;
  bookmarkButtonMode?: TBookmarkButtonMode;
}

export default function BookmarkButton({
  offer,
  bookmarkButtonMode = BookmarkButtonMode.Card
}: BookmarkButtonProps): React.JSX.Element {
  const isOfferMode = bookmarkButtonMode === BookmarkButtonMode.Offer;

  return (
    <button
      className={`button ${bookmarkButtonMode}__bookmark-button ${offer.isFavorite ? `${bookmarkButtonMode}__bookmark-button--active` : ''}`}
      type="button"
    >
      <svg className={`${bookmarkButtonMode}__bookmark-icon`} width={isOfferMode ? '31' : '18'} height={isOfferMode ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
