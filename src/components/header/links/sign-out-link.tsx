import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

export default function SignOutLink(): React.JSX.Element {
  return (
    <Link className="header__nav-link" to={AppRoute.Main}>
      <span className="header__signout">Sign out</span>
    </Link>
  );
}
