import { AuthorizationStatus } from '../../const/const';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuthAction } from '../api-action';
import { userProcess } from './user-process.slice';

describe('userProcess slice', () => {
  const stubUser = makeFakeUser();

  const initialState = {
    authorizationStatus: AuthorizationStatus.Auth,
    userEmail: stubUser.email,
  };

  const defaultState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: '',
  };

  const emptyAction = {
    type: ''
  };

  it('should return initialState in case of initialState and emptyAction', () => {
    const result = userProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return defaultState in case of undefined state and emptyAction', () => {
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(defaultState);
  });

  it('should set authorizationStatus to "AUTH" and set userEmail in case of "checkAuthAction.fulfilled" action', () => {
    const expectedState = initialState;
    const result = userProcess.reducer(undefined, checkAuthAction.fulfilled(stubUser, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to "AUTH" and clear userEmail in case of "checkAuthAction.rejected" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: '',
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });
});