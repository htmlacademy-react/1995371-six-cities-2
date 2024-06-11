import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type ProfileLinkProps = {
  isAuthorized: boolean;
}

export default function ProfileLink({isAuthorized}: ProfileLinkProps): React.JSX.Element {
  const ProfileLinkInner = isAuthorized
    ? (
      <>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        <span className="header__favorite-count">3</span>
      </>
    )
    : (
      <span className="header__login">Sign in</span>
    );

  return (
    <Link className="header__nav-link header__nav-link--profile"to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      {ProfileLinkInner}
    </Link>
  );
}
