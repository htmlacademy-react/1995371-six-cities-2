import { AuthorizationStatus } from '../../../const/const';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/user-process/user-process.selectors';
import ProfileLink from './profile-link';
import SignOutLink from './sign-out-link';

export default function HeaderNav() {
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = currentAuthorizationStatus === AuthorizationStatus.Auth;
  const signOutElement = isAuthorized && <SignOutLink />;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <ProfileLink isAuthorized={isAuthorized}/>
        </li>
        {signOutElement}
      </ul>
    </nav>
  );
}

