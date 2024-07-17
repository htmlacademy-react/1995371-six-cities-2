import { Link } from 'react-router-dom';

import { TOffers } from '../../../types/offers';
import { AppRoute } from '../../../const/const';
import { getFavoriteOffers } from '../../../utils/filter-utils';

type ProfileLinkProps = {
  isAuthorized: boolean;
  offers: TOffers;
}

export default function ProfileLink({
  isAuthorized,
  offers
}: ProfileLinkProps): React.JSX.Element {
  const favoriteOffers = getFavoriteOffers(offers);
  const ProfileLinkInner = isAuthorized
    ? (
      <>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        <span className="header__favorite-count">{favoriteOffers.length}</span>
      </>
    )
    : (
      <span className="header__login">Sign in</span>
    );

  return (
    <Link className="header__nav-link header__nav-link--profile" to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      {ProfileLinkInner}
    </Link>
  );
}
