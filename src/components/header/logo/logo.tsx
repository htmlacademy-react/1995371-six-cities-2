import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const/const';

type LogoNavLinkProps = {
  isActive: boolean;
}

const getLogoClassName = ({isActive}: LogoNavLinkProps): string => `header__logo-link ${isActive ? 'header__logo-link--active' : ''}`;

export default function Logo(): React.JSX.Element {
  return (
    <NavLink to={AppRoute.Main} className={getLogoClassName} >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </NavLink>
  );
}
