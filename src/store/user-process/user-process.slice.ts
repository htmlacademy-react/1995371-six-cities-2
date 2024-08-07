import { createSlice } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../../const/store';
import { TUserProcessInitialState } from '../../types/state';
import { AuthorizationStatus } from '../../const/const';
import { checkAuthAction, logoutAction } from '../api-action';


const initialState: TUserProcessInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userProcess = createSlice({
  name: StoreNameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        if (state.userEmail) {
          state.userEmail = '';
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
      });
  }
});
