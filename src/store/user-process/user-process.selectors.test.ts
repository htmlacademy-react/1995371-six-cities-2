import { internet } from 'faker';

import { AuthorizationStatus } from '../../const/const';
import { StoreNameSpace } from '../../const/store';
import { getAuthorizationStatus, getUserEmail } from './user-process.selectors';

describe('UserProcess selectors', () => {
  const state = {
    [StoreNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: internet.email()
    }
  };

  it('should return authorization status from state', () => {
    const {authorizationStatus} = state[StoreNameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user email from state', () => {
    const {userEmail} = state[StoreNameSpace.User];
    const result = getUserEmail(state);
    expect(result).toBe(userEmail);
  });
});
