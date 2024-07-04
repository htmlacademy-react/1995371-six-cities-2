import { BookmarkButtonMode } from '../../../types/common';
import { Offer } from '../../../types/offers';

import { BookmarkButtonModeOption } from '../../../const/mode';

type BookmarkButtonProps = {
  offer: Offer;
  bookmarkButtonMode?: BookmarkButtonMode;
}

export default function BookmarkButton({
  offer,
  bookmarkButtonMode = BookmarkButtonModeOption.Card
}: BookmarkButtonProps): React.JSX.Element {
  const isOfferMode = bookmarkButtonMode === BookmarkButtonModeOption.Offer;

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
