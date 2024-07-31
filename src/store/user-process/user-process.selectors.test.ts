import { internet } from 'faker';

import { AuthorizationStatus } from '../../const/const';
import { StoreNameSpace } from '../../const/store';
import { getAuthorizationStatus } from './user-process.selectors';

describe('UserProcess selectors', () => {
  const state = {
    [StoreNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: internet.email()
    }
  };

  it('should return authorization status from state', () => {
    // arrange
    const {authorizationStatus} = state[StoreNameSpace.User];
    // act
    const result = getAuthorizationStatus(state);
    // assert
    expect(result).toBe(authorizationStatus);
  });
});
