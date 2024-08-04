import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { TAuthData, TFavoriteInfo, TNewReviewInfo, TOfferId, TOfferInfo, TUserInfo } from '../types/api';
import { TShortOffers, TOffer, TFullOffers, TFullOffer } from '../types/offers';
import { TReview, TReviews } from '../types/reviews';
import { saveToken } from '../services/token';
import { AppRoute } from '../const/const';
import { APIRoute, FavoriteStatusPathNumber } from '../const/api';
import { APIAction } from '../const/store';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<TShortOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOffers,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TShortOffers>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<TFullOffers, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchFavoriteOffers,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TFullOffers>(APIRoute.FavoriteOffers);
    return data;
  }
);

export const setOfferFavoriteStatusAction = createAsyncThunk<TFullOffer, TFavoriteInfo, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataSetOfferFavoriteStatus,
  async ({offerId, isFavorite}, {extra: api}) => {
    const favoriteStatusRoute = `${APIRoute.FavoriteOffers}/${offerId}/${isFavorite ? FavoriteStatusPathNumber.Add : FavoriteStatusPathNumber.Remove}`;
    const {data} = await api.post<TFullOffer>(favoriteStatusRoute);
    return data;
  }
);

export const fetchOfferScreenInfoAction = createAsyncThunk<TOfferInfo, TOfferId, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataFetchOfferScreenInfo,
  async ({offerId}, {extra: api}) => {
    const offerRoute = `${APIRoute.Offers}/${offerId}`;
    const {data} = await api.get<TOffer>(offerRoute);

    const reviewsRoute = `${APIRoute.Comments}/${offerId}`;
    const reviewsResponse = await api.get<TReviews>(reviewsRoute);
    const reviews = reviewsResponse.data;

    const nearbyOffersRoute = `${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`;
    const nearbyOffersResponse = await api.get<TShortOffers>(nearbyOffersRoute);
    const nearbyOffers = nearbyOffersResponse.data;

    const screenInfo: TOfferInfo = {
      currentOffer: data,
      reviews: reviews,
      nearbyOffers: nearbyOffers
    };

    return screenInfo;
  }
);

export const postNewOfferReviewAction = createAsyncThunk<TReview, TNewReviewInfo, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.DataPostNewOfferReview,
  async ({offerId, reviewData, onSuccess}, {extra: api}) => {
    const reviewsRoute = `${APIRoute.Comments}/${offerId}`;
    const {data} = await api.post<TReview>(reviewsRoute, reviewData);

    if (data && onSuccess) {
      onSuccess();
    }

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<TUserInfo, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  APIAction.UserCheckAuth,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TUserInfo>(APIRoute.Login);
    return data;
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
