import { THeaderMode } from '../../types/common';
import { HeaderMode } from '../../const/mode';
import Logo from './logo/logo';
import HeaderNav from './header-nav/header-nav';
import { memo } from 'react';

type HeaderProps = {
  headerMode?: THeaderMode;
}

function Header({headerMode = HeaderMode.Default}: HeaderProps): React.JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {!(headerMode === HeaderMode.LoginScreen) && <HeaderNav />}
        </div>
      </div>
    </header>
  );
}

const HeaderMemo = memo(Header);

export default HeaderMemo;
