import { defaultSort } from '../../const/sort';
import { StoreNameSpace } from '../../const/store';
import { TShortOffers } from '../../types/offers';
import { cities, getRandomCity, makeFakeFullOffer, makeFakeOffer, makeFakeReview, makeFakeShortOffer, staticFavoriteCities } from '../../utils/mocks';
import { getRandomArrayItem, getRandomInteger } from '../../utils/utils';
import { getCityOffers, getCurrentCity, getCurrentOffer, getCurrentSortType, getFavoriteCities, getFavoriteCityOffers, getFavoriteOffers, getIsFormDisabled, getIsLoading, getIsNoCurrentOffer, getNearbyOffers, getOffers } from './data-process.selectors';

describe('DataProcess selectors', () => {
  const mockCity = getRandomCity();
  const offers: TShortOffers = [];
  cities.forEach((city) => {
    offers.push(makeFakeShortOffer({city}));
    offers.push(makeFakeShortOffer({city}));
  });
  const favoriteOffers = offers
    .slice()
    .filter((offer) => offer.isFavorite)
    .map((offer) => makeFakeFullOffer({shortOffer: offer}));
  const cityOffers = offers
    .slice()
    .filter((offer) => offer.city.name === mockCity.name);
  const currentOffer = makeFakeOffer({shortOffer: getRandomArrayItem(offers)});
  const nearbyOffers = offers
    .slice()
    .filter((offer) => offer.city.name === currentOffer.city.name && offer.id !== currentOffer.id);
  const currentOfferReviews = Array.from({length: getRandomInteger(0, 5)}, () => makeFakeReview());

  const state = {
    [StoreNameSpace.Data]: {
      currentCity: mockCity,
      offers: offers,
      favoriteOffers: favoriteOffers,
      cityOffers: cityOffers,
      nearbyOffers: nearbyOffers,
      currentOffer: currentOffer,
      currentOfferReviews: currentOfferReviews,
      sortType: defaultSort,
      isLoading: false,
      isNoCurrentOffer: false,
      isFormDisabled: false,
    }
  };

  it('should return currentCity from state', () => {
    const result = getCurrentCity(state);
    expect(result).toBe(mockCity);
  });

  it('should return offers from state', () => {
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return favoriteOffers from state', () => {
    const result = getFavoriteOffers(state);
    expect(result).toBe(favoriteOffers);
  });

  it('should return favorite offers cities from state', () => {
    const mockFavoriteCities = staticFavoriteCities;
    const result = getFavoriteCities(state);
    expect(result).toEqual(mockFavoriteCities);
  });

  it('should return favoriteCityOffers from state', () => {
    const mockFavoriteCities = staticFavoriteCities;
    const mockCityFavoriteOffers = new Map<string, TShortOffers>();
    mockFavoriteCities.forEach((cityName) => {
      mockCityFavoriteOffers.set(
        cityName,
        state[StoreNameSpace.Data].favoriteOffers
          .slice()
          .filter((offer) => offer.city.name === cityName)
      );
    });

    const result = getFavoriteCityOffers(state);
    expect(result).toEqual(mockCityFavoriteOffers);
  });

  it('should return cityOffers from state', () => {
    const result = getCityOffers(state);
    expect(result).toBe(cityOffers);
  });

  it('should return nearbyOffers from state', () => {
    const result = getNearbyOffers(state);
    expect(result).toBe(nearbyOffers);
  });

  it('shoule return currentOffer from state', () => {
    const result = getCurrentOffer(state);
    expect(result).toBe(currentOffer);
  });

  it('should return currentOffer reviews from state', () => {
    const result = getCurrentOffer(state);
    expect(result).toBe(currentOffer);
  });

  it('should return current sortType from state', () => {
    const {sortType} = state[StoreNameSpace.Data];
    const result = getCurrentSortType(state);
    expect(result).toBe(sortType);
  });

  it('should return isLoading flag from state', () => {
    const {isLoading} = state[StoreNameSpace.Data];
    const result = getIsLoading(state);
    expect(result).toBe(isLoading);
  });

  it('should return isNoCurrentoffer flag from state', () => {
    const {isNoCurrentOffer} = state[StoreNameSpace.Data];
    const result = getIsNoCurrentOffer(state);
    expect(result).toBe(isNoCurrentOffer);
  });

  it('should return isFormDisabled flag from state', () => {
    const {isFormDisabled} = state[StoreNameSpace.Data];
    const result = getIsFormDisabled(state);
    expect(result).toBe(isFormDisabled);
  });
});
