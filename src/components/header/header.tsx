import { HeaderMode } from '../../types/common';

import { AuthorizationStatus, HeaderModeOption } from '../../const';

import Logo from './logo/logo';
import ProfileLink from './links/profile-link';
import SignOutLink from './links/sign-out-link';

type HeaderProps = {
  authorizationStatus?: string;
  headerMode?: HeaderMode;
}

export default function Header({
  authorizationStatus = AuthorizationStatus.Auth,
  headerMode = HeaderModeOption.Default
}: HeaderProps): React.JSX.Element {
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const signOutElement = isAuthorized
    ? (
      <li className="header__nav-item">
        <SignOutLink />
      </li>
    )
    : null;

  const headerNav = headerMode === HeaderModeOption.LoginScreen
    ? null
    : (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <ProfileLink isAuthorized={isAuthorized}/>
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
