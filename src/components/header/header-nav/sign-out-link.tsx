import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/const';

type SignOutLinkProps = {
  onClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function SignOutLink({onClick}: SignOutLinkProps): React.JSX.Element {
  return (
    <Link className="header__nav-link" onClick={onClick} to={AppRoute.Main} data-testid='sign out link'>
      <span className="header__signout">Sign out</span>
    </Link>
  );
}
