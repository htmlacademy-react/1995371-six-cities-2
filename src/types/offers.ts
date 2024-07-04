import { AccommodationType } from '../const/const';
import { City, Location } from './city';

export type Accommodation = typeof AccommodationType.Apartment | typeof AccommodationType.Hotel | typeof AccommodationType.House | typeof AccommodationType.Room;

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Images = string[];

export type Id = string;

type OfferBase = {
  id: Id;
  title: string;
  type: Accommodation;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type Offer = OfferBase & {
  previewImage: string;
}

export type OfferFull = OfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: Images;
  maxAdults: number;
}

export type Offers = Offer[];
export type FullOffersPack = {[key: Id]: OfferFull};
