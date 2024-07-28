import { combineReducers } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../const/store';
import { dataProcess } from './data-process/data-process.slice';
import { userProcess } from './user-process/user-process.slice';

export const rootReducer = combineReducers({
  [StoreNameSpace.Data]: dataProcess.reducer,
  [StoreNameSpace.User]: userProcess.reducer
});
