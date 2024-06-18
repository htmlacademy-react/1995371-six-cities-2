import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const/const';

type LogoNavLinkProps = {
  isActive: boolean;
}

export default function Logo(): React.JSX.Element {
  return (
    <NavLink
      to={AppRoute.Main}
      className={({isActive}: LogoNavLinkProps): string => classNames(
        'header__logo-link',
        {'header__logo-link--active': isActive}
      )}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </NavLink>
  );
}
