import {datatype, lorem, image, commerce, name, date} from 'faker';

import { TCity } from '../types/city';
import { TFullOffer, TOffer, TOfferBase, TShortOffer } from '../types/offers';
import { CityPack } from '../const/citypack';
import { getRandomArrayItem, getRandomInteger } from './utils';
import { AccommodationType } from '../const/const';
import { SortPack } from './sort-utils';

export const cities = Object.values(CityPack);

export const staticFavoriteCities = new Set<string>([CityPack.Cologne.name, CityPack.Hamburg.name]);

export const getRandomCity = (): TCity => getRandomArrayItem<TCity>(cities);
export const getRandomSortType = () => getRandomArrayItem(Object.values(SortPack));

const makeFakeOfferBase = (city?: TCity): TOfferBase => {
  const mockCity = city ?? getRandomCity();
  const isFavorite = staticFavoriteCities.has(mockCity.name);

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
  const images = Array.from({length: getRandomInteger(1, 4)}, () => image.city());

  return {
    ...baseOffer,
    description: lorem.sentences(),
    bedrooms: getRandomInteger(1, 5),
    goods: goods,
    host: {
      name: `${name.firstName()} ${name.lastName()}`,
      avatarUrl: image.avatar(),
      isPro: Boolean(getRandomInteger(0, 1))
    },
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

export const makeFakeReview = () => ({
  id: datatype.uuid(),
  date: date.past().toISOString(),
  user: {
    name: `${name.firstName()} ${name.lastName()}`,
    avatarUrl: image.avatar(),
    isPro: Boolean(getRandomInteger(0, 1))
  },
  comment: lorem.sentences(),
  rating: getRandomInteger(1, 5)
});
