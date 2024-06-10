import { AccommodationType } from '../const';

export type Accommodation = typeof AccommodationType.Apartment | typeof AccommodationType.Hotel | typeof AccommodationType.House | typeof AccommodationType.PrivateRoom;

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Images = string[];

export interface OfferBase {
  id: string;
  title: string;
  type: Accommodation;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface OfferShort extends OfferBase {
  previewImage: string;
}

export interface Offer extends OfferBase {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: Images;
  maxAdults: number;
}

export type OfferFull = OfferShort & Offer;

export type Offers = OfferFull[];
