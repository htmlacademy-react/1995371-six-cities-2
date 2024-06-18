import { AccommodationType } from '../const/const';
import { City, Location } from './city';

export type Accommodation = typeof AccommodationType.Apartment | typeof AccommodationType.Hotel | typeof AccommodationType.House | typeof AccommodationType.Room;

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Images = string[];

export type Offer = {
  id: string;
  title: string;
  type: Accommodation;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: Images;
  maxAdults: number;
}

export type Offers = Offer[];
