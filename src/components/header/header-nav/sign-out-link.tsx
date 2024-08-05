import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/const';
import { useAppDispatch } from '../../../hooks';
import { logoutAction } from '../../../store/api-action';

export default function SignOutLink(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleSignoutLinkClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <Link className="header__nav-link" onClick={handleSignoutLinkClick} to={AppRoute.Main}>
      <span className="header__signout">Sign out</span>
    </Link>
  );
}
