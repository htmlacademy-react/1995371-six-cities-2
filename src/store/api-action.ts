import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { APIRoute } from '../const/api';
import { TOffers, TOfferFull } from '../types/offers';
import { loadCurrentOffer, loadCurrentOfferReviews, loadOffersList, redirectToRoute, setauthorizationstatus, setError, setIsloading, updateCityOffersList } from './action';
import { APIAction } from '../const/action';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { TAuthData, TOfferId, TUserInfo } from '../types/api';
import { saveToken } from '../services/token';
import { TReviews } from '../types/reviews';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOffers,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsloading(true));
    try {
      const {data} = await api.get<TOffers>(APIRoute.Offers);
      dispatch(loadOffersList(data));
      dispatch(updateCityOffersList());
    } catch(err) {
      dispatch(setError('error'));
    } finally {
      dispatch(setIsloading(false));
    }
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<void, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(APIAction.DataFetchCurrentOffer,
  async ({offerId}, {dispatch, extra: api}) => {
    const offerRoute = `${APIRoute.Offers}/${offerId}`;
    const commentsRoute = `${APIRoute.Comments}/${offerId}`;
    try {
      const {data} = await api.get<TOfferFull>(offerRoute);
      dispatch(loadCurrentOffer(data));

      const reviewsData = await api.get<TReviews>(commentsRoute);
      const reviewsList = reviewsData.data;
      dispatch(loadCurrentOfferReviews(reviewsList));
    } catch {
      dispatch(redirectToRoute({route: AppRoute.Page404}));
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

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.UserLogin,
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<TUserInfo>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(checkAuthAction());
    dispatch(redirectToRoute({route: AppRoute.Main}));
  }
);
