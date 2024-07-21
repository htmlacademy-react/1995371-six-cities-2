import { TCity } from '../types/city';

const CityPack = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85885484999999,
      longitude: 2.349781581954882,
      zoom: 12
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.932061508314185,
      longitude: 6.968687509096512,
      zoom: 12
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.84729191075727,
      longitude: 4.359278869270505,
      zoom: 12
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37052366645486,
      longitude: 4.9013696820795,
      zoom: 12
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.547444845224746,
      longitude: 10.015017848781573,
      zoom: 12
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.22458029534912,
      longitude: 6.784129720201334,
      zoom: 12
    }
  },
} as const;

const DEFAULT_CITY: TCity = CityPack.Paris;

export { CityPack, DEFAULT_CITY };
