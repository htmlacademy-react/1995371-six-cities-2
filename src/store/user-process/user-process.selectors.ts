import { StoreNameSpace } from '../../const/store';
import { TState } from '../../types/state';


const getAuthorizationStatus = (state: TState) => state[StoreNameSpace.User].authorizationStatus;
const getUserEmail = (state: TState) => state[StoreNameSpace.User].userEmail;

export { getAuthorizationStatus, getUserEmail };
