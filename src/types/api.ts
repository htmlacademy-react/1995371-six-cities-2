import { AppRoute } from '../const/const';
import { TOffer, TShortOffers } from './offers';
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

export type TOfferInfo = {
  currentOffer: TOffer;
  reviews: TReviews;
  nearbyOffers: TShortOffers;
}

export type TNewReviewInfo = TOfferId & {
  reviewData: TReviewState;
  onSuccess?: () => void;
}

export type TFavoriteInfo = TOfferId & {
  isFavorite: boolean;
}

export type TRedirectRoute = {
  route: AppRoute;
  parameter?: string;
}
