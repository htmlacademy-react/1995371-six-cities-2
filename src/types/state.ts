import { store } from '../store';
import { TCity } from './city';
import { TAuthorizationStatus } from './common';
import { TOffers, TOfferFull } from './offers';
import { TReviews } from './reviews';
import { TSortName } from './sort';

export type TState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export type TInitialState = {
  currentCity: TCity;
  offers: TOffers;
  favoriteOffers: TOffers;
  cityOffers: TOffers;
  nearbyOffers: TOffers;
  currentOffer: TOfferFull | null;
  currentOfferReviews: TReviews;
  sortType: TSortName;
  isLoading: boolean;
  isCityOffers: boolean;
  isNoCurrentOffer: boolean;
  authorizationStatus: TAuthorizationStatus;
  isFormDisabled: boolean;
  userEmail: string;
};

export type TUserProcessInitialState = Pick<TInitialState, 'authorizationStatus' | 'userEmail'>;
export type TDataProcessInitialState = Omit<TInitialState, 'authorizationStatus' | 'userEmail'>;
