import { CityPack } from '../const/citypack';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type CityPackType = typeof CityPack;
