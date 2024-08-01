import { DEFAULT_CITY } from '../../const/citypack';
import { defaultSort } from '../../const/sort';
import { getRandomCity, makeFakeShortOffer } from '../../utils/mocks';
import { dataProcess, updateCurrentCity } from './data-process.slice';

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

  // it('should not set "currentCity" to another City in case of "updateCurrentCity"', () => {
  //   const newCity = {
  //     name: '',
  //     location: {
  //       latitude: 3454,
  //       longitude: 3465,
  //       zoom: 45
  //     }
  //   };
  //   dataProcess.reducer(undefined, updateCurrentCity(newCity));
  //   // console.log(result);
  //   // expect(result.currentCity).not.toEqual(newCity);
  // });
});
