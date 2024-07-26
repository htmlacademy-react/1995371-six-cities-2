import { TBookmarkButtonMode } from '../../../types/common';
import { TOfferBase } from '../../../types/offers';
import { BookmarkButtonMode } from '../../../const/mode';
import { setOfferFavoriteStatus } from '../../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/user-process/user-process.selectors';
import { AppRoute, AuthorizationStatus } from '../../../const/const';
import { redirectToRoute } from '../../../store/action';

type BookmarkButtonProps = {
  offer: TOfferBase;
  bookmarkButtonMode?: TBookmarkButtonMode;
}

export default function BookmarkButton({
  offer,
  bookmarkButtonMode = BookmarkButtonMode.Card
}: BookmarkButtonProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const isOfferMode = bookmarkButtonMode === BookmarkButtonMode.Offer;

  const handleBookmarkButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();

    if (!isAuthorized) {
      dispatch(redirectToRoute({route: AppRoute.Login}));
      return;
    }

    dispatch(setOfferFavoriteStatus({
      offerId: offer.id,
      isFavorite: !offer.isFavorite
    }));
  };

  return (
    <button
      className={`button ${bookmarkButtonMode}__bookmark-button ${offer.isFavorite ? `${bookmarkButtonMode}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleBookmarkButtonClick}
    >
      <svg className={`${bookmarkButtonMode}__bookmark-icon`} width={isOfferMode ? '31' : '18'} height={isOfferMode ? '33' : '19'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
