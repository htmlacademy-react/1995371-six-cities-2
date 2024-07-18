import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { APIRoute } from '../const/api';
import { TOffers, TOfferFull } from '../types/offers';
import { loadCurrentOffer, loadCurrentOfferReviews, loadNearbyOffers, loadOffersList, redirectToRoute, setauthorizationstatus, setError, setIsloading, updateCityOffersList } from './action';
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
}>(
  APIAction.DataFetchCurrentOffer,
  async ({offerId}, {dispatch, extra: api}) => {
    const offerRoute = `${APIRoute.Offers}/${offerId}`;
    const {data} = await api.get<TOfferFull>(offerRoute);
    dispatch(loadCurrentOffer(data));
  }
);

export const fetchCurrentOfferReviewsAction = createAsyncThunk<void, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchCurrentOfferReviews,
  async ({offerId}, {dispatch, extra: api}) => {
    const reviewsRoute = `${APIRoute.Comments}/${offerId}`;
    const {data} = await api.get<TReviews>(reviewsRoute);
    dispatch(loadCurrentOfferReviews(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchNearbyOffers,
  async ({offerId}, {dispatch, extra: api}) => {
    const nearbyOffersRoute = `${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`;
    const {data} = await api.get<TOffers>(nearbyOffersRoute);
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchOfferScreenInfo = createAsyncThunk<void, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOfferScreenInfo,
  async ({offerId}, {dispatch}) => {
    try {
      await dispatch((fetchCurrentOfferAction({offerId})));
      await dispatch((fetchCurrentOfferReviewsAction({offerId})));
      await dispatch((fetchNearbyOffersAction({offerId})));
      dispatch(redirectToRoute({route: AppRoute.OfferBase, parameter: offerId}));
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
