import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import HeaderNav from './header-nav';
import { makeFakeStoreState } from '../../../utils/mocks';
import { StoreNameSpace } from '../../../const/store';
import { AuthorizationStatus } from '../../../const/const';

vi.mock('./profile-link', () => ({
  default: () => <div data-testid='mocked ProfileLink'>Mocked profile link</div>
}));

vi.mock('./sign-out-link', () => ({
  default: () => <div data-testid='mocked SignOutLink'>Mocked sign out link</div>
}));

describe('Component: HeaderNav', () => {
  it('Should render correctly if user is authorized', () => {
    const { withStoreComponent } = withStore(<HeaderNav />, makeFakeStoreState({
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: ''
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('mocked ProfileLink')).toBeInTheDocument();
    expect(screen.getByTestId('mocked SignOutLink')).toBeInTheDocument();
  });

  it('Should render correctly if user is not authorized', () => {
    const { withStoreComponent } = withStore(<HeaderNav />, makeFakeStoreState({
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: ''
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('mocked ProfileLink')).toBeInTheDocument();
    expect(screen.queryByTestId('mocked SignOutLink')).not.toBeInTheDocument();
  });
});
