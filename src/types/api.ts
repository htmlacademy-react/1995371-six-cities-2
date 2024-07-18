import { AppRoute } from '../const/const';

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

export type TRedirectRoute = {
  route: AppRoute;
  parameter?: string;
}
