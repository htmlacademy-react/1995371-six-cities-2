import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { APIRoute } from '../const/api';
import { TOffers, TOfferFull } from '../types/offers';
import { addReviewToList, loadOfferInfo, loadOffersList, loadUserEmail, loadUserName, redirectToRoute, setauthorizationstatus, setIsFormDisabled, setIsloading, updateCityOffersList } from './action';
import { APIAction } from '../const/action';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { TAuthData, TNewReviewInfo, TOfferId, TUserInfo } from '../types/api';
import { saveToken } from '../services/token';
import { TReview, TReviews } from '../types/reviews';

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
    } finally {
      dispatch(setIsloading(false));
    }
  }
);

export const fetchOfferScreenInfo = createAsyncThunk<void, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOfferScreenInfo,
  async ({offerId}, {dispatch, extra: api}) => {
    const offerRoute = `${APIRoute.Offers}/${offerId}`;
    const {data} = await api.get<TOfferFull>(offerRoute);

    const reviewsRoute = `${APIRoute.Comments}/${offerId}`;
    const reviewsResponse = await api.get<TReviews>(reviewsRoute);
    const reviews = reviewsResponse.data;

    const nearbyOffersRoute = `${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`;
    const nearbyOffersResponse = await api.get<TOffers>(nearbyOffersRoute);
    const nearbyOffers = nearbyOffersResponse.data;

    const screenInfo = {
      currentOffer: data,
      reviews: reviews,
      nearbyOffers: nearbyOffers
    };

    dispatch(loadOfferInfo(screenInfo));
  }
);

export const postNewOfferReviewAction = createAsyncThunk<void, TNewReviewInfo, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataPostNewOfferReview,
  async ({offerId, reviewData, onSuccess}, {dispatch, extra: api}) => {
    const reviewsRoute = `${APIRoute.Comments}/${offerId}`;
    dispatch(setIsFormDisabled(true));
    try {
      const {data} = await api.post<TReview>(reviewsRoute, reviewData);
      dispatch(addReviewToList(data));

      if (onSuccess) {
        onSuccess();
      }

    } finally {
      dispatch(setIsFormDisabled(false));
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
    let userName = '';
    let userEmail = '';
    try {
      const {data} = await api.get<TUserInfo>(APIRoute.Login);
      dispatch(setauthorizationstatus(AuthorizationStatus.Auth));
      userName = data.name;
      userEmail = data.email;
    } catch {
      dispatch(setauthorizationstatus(AuthorizationStatus.NoAuth));
    } finally {
      dispatch(loadUserName(userName));
      dispatch(loadUserEmail(userEmail));
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
    const {data} = await api.post<TUserInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(checkAuthAction());
    dispatch(redirectToRoute({route: AppRoute.Main}));
  }
);
