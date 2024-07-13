import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const/api';
import { Offers } from '../types/offers';
import { loadOffersList, setIsloading, updateCityOffersList } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsloading(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setIsloading(false));
    dispatch(loadOffersList(data));
    dispatch(updateCityOffersList());
  }
);
