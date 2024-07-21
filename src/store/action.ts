import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/city';
import { TOffers } from '../types/offers';
import { TSortName } from '../types/sort';
import { Action } from '../const/action';
import { TAuthorizationStatus } from '../types/common';
import { TReview } from '../types/reviews';
import { TOfferInfo, TRedirectRoute } from '../types/api';

export const updateCurrentCity = createAction<TCity>(Action.UpdateCurrentCity);
export const updateSortType = createAction<TSortName>(Action.UpdateSortType);
export const loadOffersList = createAction<TOffers>(Action.LoadOffersList);
export const updateCityOffersList = createAction(Action.UpdateCityOffersList);
export const addReviewToList = createAction<TReview>(Action.AddReviewToList);
export const setIsFormDisabled = createAction<boolean>(Action.SetIsFormDisabled);
export const setIsloading = createAction<boolean>(Action.SetIsloading);
export const setauthorizationstatus = createAction<TAuthorizationStatus>(Action.SetAuthorizationStatus);
export const redirectToRoute = createAction<TRedirectRoute>(Action.RedirectToRoute);

export const loadOfferInfo = createAction<TOfferInfo>(Action.LoadOfferInfo);
