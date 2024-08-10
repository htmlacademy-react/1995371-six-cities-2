import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import LoginScreen from './login-screen';
import { AuthorizationStatus } from '../../const/const';
import { StoreNameSpace } from '../../const/store';

describe('Component: Login screen', () => {
  it('should render correctly', () => {
    const expectedTitleText = 'Sign in';
    const loginLabelText = 'E-mail';
    const loginDataTestid = 'loginElement';
    const passwordLabelText = 'Password';
    const passwordDataTestid = 'passwordElement';
    const submitButtonDataTestid = 'submitButtonElement';

    const initialState = {
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: ''
      }
    };

    const {withStoreComponent} = withStore(<LoginScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByText(expectedTitleText).length).toBe(2);
    expect(screen.getByText(loginLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(loginDataTestid)).toBeInTheDocument();
    expect(screen.getByText(passwordLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(passwordDataTestid)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonDataTestid)).toBeInTheDocument();
  });
});
