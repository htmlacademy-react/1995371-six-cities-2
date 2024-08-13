import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { StoreNameSpace } from '../../const/store';
import { withHistory, withStore } from '../../utils/mock-component';
import LoginScreen from './login-screen';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

describe('Component: Login screen', () => {
  const screenTitleElementTestid = 'screen title element';
  const loginScreenTitleText = 'Sign in';
  const loginLabelText = 'E-mail';
  const loginDataTestid = 'loginElement';
  const passwordLabelText = 'Password';
  const passwordDataTestid = 'passwordElement';
  const submitButtonDataTestid = 'submitButtonElement';
  const isAuthText = 'is authorized';

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Login);
  });

  it('Should render correctly in case of user\'s authorizations status is unknown', () => {

    const initialState = {
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: ''
      }
    };

    const {withStoreComponent} = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Main} element={<div>{isAuthText}</div>} />
      </Routes>,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.queryByText(isAuthText)).not.toBeInTheDocument();
    expect(screen.getByTestId(screenTitleElementTestid).textContent).toBe(loginScreenTitleText);
    expect(screen.getAllByText(loginScreenTitleText).length).toBe(2);
    expect(screen.getByText(loginLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(loginDataTestid)).toBeInTheDocument();
    expect(screen.getByText(passwordLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(passwordDataTestid)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonDataTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of user is authorized', () => {
    const initialState = {
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: ''
      }
    };

    const {withStoreComponent} = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Main} element={<div>{isAuthText}</div>} />
      </Routes>,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(isAuthText)).toBeInTheDocument();
    expect(screen.queryAllByText(loginScreenTitleText).length).toBe(0);
    expect(screen.queryByText(loginLabelText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(loginDataTestid)).not.toBeInTheDocument();
    expect(screen.queryByText(passwordLabelText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(passwordDataTestid)).not.toBeInTheDocument();
    expect(screen.queryByTestId(submitButtonDataTestid)).not.toBeInTheDocument();
  });
});
