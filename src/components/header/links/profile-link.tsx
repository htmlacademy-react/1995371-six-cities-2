import { Link } from 'react-router-dom';

import { AppRoute } from '../../../const/const';
import { getFavoriteOffers } from '../../../utils/filter-utils';
import { useAppSelector } from '../../../hooks';
import { getOffers } from '../../../store/data-process/data-process.selectors';
import { getUserEmail } from '../../../store/user-process/user-process.selectors';

type ProfileLinkProps = {
  isAuthorized: boolean;
}

export default function ProfileLink({
  isAuthorized,
}: ProfileLinkProps): React.JSX.Element {
  const offers = useAppSelector(getOffers);
  const userEmail = useAppSelector(getUserEmail);
  const favoriteOffers = getFavoriteOffers(offers);
  const ProfileLinkInner = isAuthorized
    ? (
      <>
        <span className="header__user-name user__name">{userEmail}</span>
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
