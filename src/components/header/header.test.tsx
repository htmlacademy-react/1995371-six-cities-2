import { render, screen } from '@testing-library/react';
import Header from './header';
import { HeaderMode } from '../../const/mode';

vi.mock('./logo/logo', () => ({
  default: () => <div data-testid='mocked Logo'>Mocked logo</div>
}));

vi.mock('./header-nav/header-nav', () => ({
  default: () => <div data-testid='mocked HeaderNav'>Mocked header nav</div>
}));

describe('Component: Header', () => {
  it('Should render correctly in case of not LoginScreen (default headerMode)', () => {
    render(<Header />);

    expect(screen.getByTestId('mocked Logo')).toBeInTheDocument();
    expect(screen.getByTestId('mocked HeaderNav')).toBeInTheDocument();
  });

  it('Should render correctly in case of LoginScreen', () => {
    render(<Header headerMode={HeaderMode.LoginScreen}/>);

    expect(screen.getByTestId('mocked Logo')).toBeInTheDocument();
    expect(screen.queryByTestId('mocked HeaderNav')).not.toBeInTheDocument();
  });
});
