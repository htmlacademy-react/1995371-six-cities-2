import { THeaderMode } from '../../types/common';
import { Offers } from '../../types/offers';

import { AuthorizationStatus } from '../../const/const';
import { HeaderMode } from '../../const/mode';
import Logo from './logo/logo';
import ProfileLink from './links/profile-link';
import SignOutLink from './links/sign-out-link';

type HeaderProps = {
  authorizationStatus?: string;
  headerMode?: THeaderMode;
  offers: Offers;
}

export default function Header({
  authorizationStatus = AuthorizationStatus.Auth,
  headerMode = HeaderMode.Default,
  offers
}: HeaderProps): React.JSX.Element {
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const signOutElement = isAuthorized
    ? (
      <li className="header__nav-item">
        <SignOutLink />
      </li>
    )
    : null;

  const headerNav = headerMode === HeaderMode.LoginScreen
    ? null
    : (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <ProfileLink isAuthorized={isAuthorized} offers={offers}/>
          </li>
          {signOutElement}
        </ul>
      </nav>
    );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {headerNav}
        </div>
      </div>
    </header>
  );
}
