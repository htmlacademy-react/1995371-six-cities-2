import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { APIRoute } from '../const/api';
import { Offers } from '../types/offers';
import { loadOffersList, setauthorizationstatus, setIsloading, updateCityOffersList } from './action';
import { APIAction } from '../const/action';
import { AuthorizationStatus } from '../const/const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOffers,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsloading(true));
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffersList(data));
      dispatch(updateCityOffersList());
    } finally {
      dispatch(setIsloading(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.UserCheckAuth,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setauthorizationstatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setauthorizationstatus(AuthorizationStatus.NoAuth));
    }
  }
);
