import { CityPack } from '../const/citypack';

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCity = {
  name: string;
  location: TLocation;
};

export type TCityPackType = typeof CityPack;
