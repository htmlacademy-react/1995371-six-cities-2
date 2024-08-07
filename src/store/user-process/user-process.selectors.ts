import { StoreNameSpace } from '../../const/store';
import { TState } from '../../types/state';

type TStateUser = Pick<TState, StoreNameSpace.User>
const getAuthorizationStatus = (state: TStateUser) => state[StoreNameSpace.User].authorizationStatus;
const getUserEmail = (state: TStateUser) => state[StoreNameSpace.User].userEmail;

export { getAuthorizationStatus, getUserEmail };
