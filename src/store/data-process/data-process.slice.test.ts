import { DEFAULT_CITY } from '../../const/citypack';
import { defaultSort, SortPack } from '../../utils/sort-utils';
import { getRandomCity, getRandomSortType, makeFakeShortOffer } from '../../utils/mocks';
import { dataProcess, updateCityOffersList, updateCurrentCity, updateSortType } from './data-process.slice';

describe('DataProcess slice', () => {
  const defaultState = {
    currentCity: DEFAULT_CITY,
    offers: [],
    favoriteOffers: [],
    cityOffers: [],
    nearbyOffers: [],
    currentOffer: null,
    currentOfferReviews: [],
    sortType: defaultSort,
    isLoading: false,
    isNoCurrentOffer: false,
    isFormDisabled: false,
  };

  const emptyAction = {
    type: ''
  };

  it('should return initial state in case of initialState and emptyAction', () => {
    const initialState = {
      currentCity: DEFAULT_CITY,
      offers: [makeFakeShortOffer({})],
      favoriteOffers: [],
      cityOffers: [],
      nearbyOffers: [],
      currentOffer: null,
      currentOfferReviews: [],
      sortType: defaultSort,
      isLoading: true,
      isNoCurrentOffer: true,
      isFormDisabled: false,
    };

    const result = dataProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should fail test', () => {
    const initialState = {
      currentCity: DEFAULT_CITY,
      offers: [makeFakeShortOffer({})],
      favoriteOffers: [],
      cityOffers: [],
      nearbyOffers: [],
      currentOffer: null,
      currentOfferReviews: [],
      sortType: defaultSort,
      isLoading: true,
      isNoCurrentOffer: true,
      isFormDisabled: false,
    };

    const result = dataProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(defaultState);
  });

  it('should return default initial state in case of undefined state and emptyAction', () => {
    const result = dataProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(defaultState);
  });

  it('should set "currentCity" to another City in case of "updateCurrentCity"', () => {
    const newCity = getRandomCity();
    const result = dataProcess.reducer(undefined, updateCurrentCity(newCity));
    expect(result.currentCity).toEqual(newCity);
  });

  it('should not set "currentCity" to another City in case of "updateCurrentCity"', () => {
    const newCity = {
      name: '',
      location: {
        latitude: 3454,
        longitude: 3465,
        zoom: 45
      }
    };
    const result = dataProcess.reducer(undefined, updateCurrentCity(newCity));
    // console.log(result);
    expect(result.currentCity).not.toEqual(newCity);
  });

  it('should set "sortType" to another sortType in case of "updateSortType"', () => {
    const newSortTypeAlias = getRandomSortType().Alias;
    const result = dataProcess.reducer(undefined, updateSortType(newSortTypeAlias));
    expect(result.sortType).toBe(newSortTypeAlias);
  });

  describe('cityOffers tests', () => {
    it('should set cityOffers to default array of TSHortOffers in case of updateCityOffersList', () => {
      const firstOffer = {
        ...makeFakeShortOffer({city: DEFAULT_CITY}),
        price: 2,
        rating: 1
      };

      const secondOffer = {
        ...makeFakeShortOffer({city: DEFAULT_CITY}),
        price: 1,
        rating: 2
      };

      const initialState = {
        currentCity: DEFAULT_CITY,
        offers: [firstOffer, secondOffer],
        favoriteOffers: [],
        cityOffers: [],
        nearbyOffers: [],
        currentOffer: null,
        currentOfferReviews: [],
        sortType: defaultSort,
        isLoading: true,
        isNoCurrentOffer: true,
        isFormDisabled: false,
      };

      const result = dataProcess.reducer(initialState, updateCityOffersList);
      expect(result.cityOffers).toEqual(initialState.offers);
    });

    it('should set cityOffers to rating sorted array of TSHortOffers in case of updateCityOffersList and ToLowerRating sortType', () => {
      const firstOffer = {
        ...makeFakeShortOffer({city: DEFAULT_CITY}),
        price: 2,
        rating: 1
      };

      const secondOffer = {
        ...makeFakeShortOffer({city: DEFAULT_CITY}),
        price: 1,
        rating: 2
      };

      const initialState = {
        currentCity: DEFAULT_CITY,
        offers: [firstOffer, secondOffer],
        favoriteOffers: [],
        cityOffers: [],
        nearbyOffers: [],
        currentOffer: null,
        currentOfferReviews: [],
        sortType: SortPack.ToLowerRating.Alias,
        isLoading: true,
        isNoCurrentOffer: true,
        isFormDisabled: false,
      };

      const expectedCityOffers = [secondOffer, firstOffer];

      const result = dataProcess.reducer(initialState, updateCityOffersList);
      // console.log(result);
      expect(result.cityOffers).toEqual(expectedCityOffers);
    });

  });

});
