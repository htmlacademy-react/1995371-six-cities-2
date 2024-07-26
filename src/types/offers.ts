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

export type TShortOffer = TOfferBase & {
  previewImage: string;
}

export type TOffer = TOfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: TImages;
  maxAdults: number;
}

export type TFullOffer = TShortOffer & TOffer;

export type TShortOffers = TShortOffer[];
export type TFullOffers = TFullOffer[];
export type TOffersPack = {[key: TId]: TOffer};
