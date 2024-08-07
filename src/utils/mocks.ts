import {datatype, lorem, image, commerce, name, date, internet} from 'faker';

import { TCity } from '../types/city';
import { TFullOffer, TOffer, TOfferBase, TShortOffer } from '../types/offers';
import { CityPack, DEFAULT_CITY } from '../const/citypack';
import { getRandomArrayItem, getRandomInteger } from './utils';
import { AccommodationType, AuthorizationStatus } from '../const/const';
import { defaultSort, SortPack } from './sort-utils';
import { TReview } from '../types/reviews';
import { TState } from '../types/state';
import { createAPI } from '../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../const/store';

export type AppThunkDispatch = ThunkDispatch<TState, ReturnType<typeof createAPI>, Action>

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const cities = Object.values(CityPack);
export const stubFavoriteCities = new Set<string>([CityPack.Cologne.name, CityPack.Hamburg.name]);
export const getRandomCity = (): TCity => getRandomArrayItem<TCity>(cities);
export const getRandomSortType = () => getRandomArrayItem(Object.values(SortPack));
export const makeFakeCityImageUrl = () => image.imageUrl(100, 100, 'city', true);
export const makeFakeDescription = () => lorem.sentences();

export const makeFakeBaseUser = () => ({
  name: `${name.firstName()} ${name.lastName()}`,
  avatarUrl: image.avatar(),
  isPro: Boolean(getRandomInteger(0, 1))
});

export const makeFakeUser = () => ({
  ...makeFakeBaseUser(),
  email: internet.email(),
  token: datatype.uuid()
});

const makeFakeOfferBase = (city?: TCity): TOfferBase => {
  const mockCity = city ?? getRandomCity();
  const isFavorite = stubFavoriteCities.has(mockCity.name);

  return (
    {
      id: datatype.uuid(),
      title: lorem.sentence(),
      type: AccommodationType.Apartment,
      price: getRandomInteger(100, 1000),
      city: mockCity,
      location: mockCity.location,
      isFavorite: isFavorite,
      isPremium: Boolean(getRandomInteger(0, 1)),
      rating: getRandomInteger(1, 5),
    });
};

type makeFakeShortOfferProps = {
  city?: TCity;
}

export const makeFakeShortOffer = ({city}: makeFakeShortOfferProps): TShortOffer => {
  const baseOffer = makeFakeOfferBase(city);

  return (
    {
      ...baseOffer,
      previewImage: image.city(),
    });
};

type makeFakeOfferProps = {
  shortOffer?: TShortOffer;
  city?: TCity;
}

export const makeFakeFullOffer = ({shortOffer, city}: makeFakeOfferProps): TFullOffer => {
  const baseOffer = shortOffer ?? makeFakeShortOffer({city});
  const goods = Array.from({length: getRandomInteger(0, 8)}, () => commerce.productName());
  const images = Array.from({length: getRandomInteger(1, 4)}, () => makeFakeCityImageUrl());

  return {
    ...baseOffer,
    description: lorem.sentences(),
    bedrooms: getRandomInteger(1, 5),
    goods: goods,
    host: makeFakeBaseUser(),
    images: images,
    maxAdults: getRandomInteger(0, 8)
  };
};

type TFullOfferToOffer = TOffer & {
  previewImage?: string;
}

export const makeFakeOffer = ({shortOffer, city}: makeFakeOfferProps): TOffer => {

  const transformOffer: TFullOfferToOffer = makeFakeFullOffer({shortOffer, city});
  delete transformOffer.previewImage;
  return transformOffer;
};

export const makeFakeReview = (): TReview => ({
  id: datatype.uuid(),
  date: date.past().toISOString(),
  user: makeFakeBaseUser(),
  comment: lorem.sentences(),
  rating: getRandomInteger(1, 5)
});

export const makeFakeStoreState = (initialState: Partial<TState> = {}): TState => {
  const stubshortOffer = makeFakeShortOffer({city: DEFAULT_CITY});
  return (
    {
      [StoreNameSpace.Data]: {
        currentCity: DEFAULT_CITY,
        offers: [stubshortOffer, makeFakeShortOffer({})],
        favoriteOffers: [makeFakeFullOffer({city: DEFAULT_CITY})],
        cityOffers: [makeFakeShortOffer({city: DEFAULT_CITY})],
        nearbyOffers: [makeFakeShortOffer({city: DEFAULT_CITY})],
        currentOffer: makeFakeOffer({shortOffer: stubshortOffer}),
        currentOfferReviews: [makeFakeReview()],
        sortType: defaultSort,
        isLoading: false,
        isNoCurrentOffer: false,
        isFormDisabled: false
      },
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: ''
      },
      ...initialState
    }
  );
};
