import { AppRoute } from '../const/const';
import { TOfferFull, TOffers } from './offers';
import { TReviews, TReviewState } from './reviews';

export type TAuthData = {
  email: string;
  password: string;
};

export type TUserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type TOfferId = {
  offerId: string;
}

export type TNewReviewInfo = TOfferId & {
  reviewData: TReviewState;
  onSuccess?: () => void;
}

export type TRedirectRoute = {
  route: AppRoute;
  parameter?: string;
}

export type TOfferInfo = {
  currentOffer: TOfferFull;
  reviews: TReviews;
  nearbyOffers: TOffers;
}
