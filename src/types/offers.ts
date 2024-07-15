import { AccommodationType } from '../const/const';
import { TCity, TLocation } from './city';

export type TAccommodation = AccommodationType;

export type THost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type TImages = string[];

export type TId = string;

export type TOfferBase = {
  id: TId;
  title: string;
  type: TAccommodation;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type TOffer = TOfferBase & {
  previewImage: string;
}

export type TOfferFull = TOfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: TImages;
  maxAdults: number;
}

export type Offers = TOffer[];
export type TFullOffersPack = {[key: TId]: TOfferFull};
