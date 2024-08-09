import { TCity } from '../types/city';
import { TShortOffer, TShortOffers } from '../types/offers';
import { makeFakeShortOffer } from './mocks';
import { CityPack } from '../const/citypack';
import { SortPack } from './sort-utils';

describe('Sort test', () => {
  const defaultCity: TCity = CityPack.Amsterdam;
  const additionalCity: TCity = CityPack.Brussels;

  const stabOffer1: TShortOffer = {
    ...makeFakeShortOffer({city: defaultCity}),
    price: 2,
    rating: 3
  };

  const stabOffer2: TShortOffer = {
    ...makeFakeShortOffer({city: defaultCity}),
    price: 3,
    rating: 1
  };

  const stabOffer3: TShortOffer = {
    ...makeFakeShortOffer({city: additionalCity}),
    price: 1,
    rating: 2
  };

  const stabOffers: TShortOffers = [stabOffer1, stabOffer2, stabOffer3];

  it('Should return cityFiltered offers array', () => {
    const expectedOffers = [stabOffer1, stabOffer2];
    const result = SortPack.Popular.SortFunction(stabOffers, defaultCity);
    expect(result).toEqual(expectedOffers);
  });

  it('Should return sorted from lower to higher price offers array', () => {
    const expectedOffers = [stabOffer3, stabOffer1, stabOffer2];
    const result = SortPack.ToHigherPrice.SortFunction(stabOffers);
    expect(result).toEqual(expectedOffers);
  });

  it('Should return sorted from higher to lower price offers array', () => {
    const expectedOffers = [stabOffer2, stabOffer1, stabOffer3];
    const result = SortPack.ToLowerPrice.SortFunction(stabOffers);
    expect(result).toEqual(expectedOffers);
  });

  it('Should return sorted from higher to lower rating offers array', () => {
    const expectedOffers = [stabOffer1, stabOffer3, stabOffer2];
    const result = SortPack.ToLowerRating.SortFunction(stabOffers);
    expect(result).toEqual(expectedOffers);
  });
});
