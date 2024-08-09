import { DEFAULT_CITY } from '../../const/citypack';
import { defaultSort, SortPack } from '../../utils/sort-utils';
import { getRandomCity, getRandomSortType, makeFakeFullOffer, makeFakeOffer, makeFakeReview, makeFakeShortOffer } from '../../utils/mocks';
import { clearOfferScreenInfo, dataProcess, updateCityOffersList, updateCurrentCity, updateSortType } from './data-process.slice';
import { fetchFavoriteOffersAction, fetchOffersAction, fetchOfferScreenInfoAction, logoutAction, postNewOfferReviewAction, setOfferFavoriteStatusAction } from '../api-action';

describe('DataProcess slice', () => {
  const stubCurrentOffer = makeFakeOffer({});
  const stubCurrentOfferReviews = [makeFakeReview(), makeFakeReview()];
  const stubNearbyOffers = [makeFakeShortOffer({}), makeFakeShortOffer({})];

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

  it('Should return initial state in case of initialState and emptyAction', () => {
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

  it('Should return default initial state in case of undefined state and emptyAction', () => {
    const result = dataProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(defaultState);
  });

  describe('reducers\' tests', () => {
    it('Should set "currentCity" to another City in case of "updateCurrentCity"', () => {
      const newCity = getRandomCity();
      const result = dataProcess.reducer(undefined, updateCurrentCity(newCity));
      expect(result.currentCity).toEqual(newCity);
    });

    it('Should throw error in case of "updateCurrentCity" and invalid city', () => {
      const newCity = {
        name: '',
        location: {
          latitude: 3454,
          longitude: 3465,
          zoom: 45
        }
      };
      expect(() => {
        dataProcess.reducer(undefined, updateCurrentCity(newCity));
      }).toThrow('Unknown city');
    });

    it('Should set "sortType" to another sortType in case of "updateSortType"', () => {
      const newSortTypeAlias = getRandomSortType().Alias;
      const result = dataProcess.reducer(undefined, updateSortType(newSortTypeAlias));
      expect(result.sortType).toBe(newSortTypeAlias);
    });

    describe('cityOffers tests', () => {
      it('Should set cityOffers to default array of TSHortOffers in case of updateCityOffersList', () => {
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

      it('Should set cityOffers to rating sorted array of TSHortOffers in case of updateCityOffersList and ToLowerRating sortType', () => {
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
        expect(result.cityOffers).toEqual(expectedCityOffers);
      });
    });

    it('Should set "currentOffer", "currentOfferReviews", "nearbyOffers" and "isNoCurrentOffer" to default values in case of "clearOfferScreenInfo" action', () => {
      const initialState = {
        ...defaultState,
        nearbyOffers: stubNearbyOffers,
        currentOffer: stubCurrentOffer,
        currentOfferReviews: stubCurrentOfferReviews,
        isNoCurrentOffer: true,
      };

      const result = dataProcess.reducer(initialState, clearOfferScreenInfo);
      expect(result).toEqual(defaultState);
    });
  });

  describe('extraReducers\' tests', () => {
    describe('fetchOffersAction tests', () => {
      it('Should set "isLoading" to "true" in case of "fetchOffersAction.pending"', () => {
        const result = dataProcess.reducer(undefined, fetchOffersAction.pending);
        expect(result.isLoading).toBe(true);
      });

      it('Should set offers to array of offers, "isLoading" to "false" and update cityOffers in case of "fetchOffersAction.fulfilled"', () => {
        const stubOffers = [makeFakeShortOffer({city: DEFAULT_CITY}), makeFakeShortOffer({city: DEFAULT_CITY})];
        const expectedState = {
          currentCity: DEFAULT_CITY,
          offers: stubOffers,
          favoriteOffers: [],
          cityOffers: stubOffers,
          nearbyOffers: [],
          currentOffer: null,
          currentOfferReviews: [],
          sortType: defaultSort,
          isLoading: false,
          isNoCurrentOffer: false,
          isFormDisabled: false,
        };

        const result = dataProcess.reducer(undefined, fetchOffersAction.fulfilled(stubOffers, '', undefined));
        expect(result).toEqual(expectedState);
      });

      it('Should set "isLoading" to "false" in case of "fetchOffersAction.rejected"', () => {
        const result = dataProcess.reducer(undefined, fetchOffersAction.rejected);
        expect(result.isLoading).toBe(false);
      });
    });

    it('Should set "favoriteOffers" to array of FullOffers in case of "fetchFavoriteOffersAction.fulfilled"', () => {
      const stubFavoriteOffers = [makeFakeFullOffer({}), makeFakeFullOffer({})];
      const result = dataProcess.reducer(undefined, fetchFavoriteOffersAction.fulfilled(stubFavoriteOffers, '', undefined));
      expect(result.favoriteOffers).toEqual(stubFavoriteOffers);
    });

    it('Should update "isFavorite" value for specific offer in offers, favoriteOffers, cityOffers, nearbyOffers and (conditionally) currentOffer in case of "setOfferFavoriteStatusAction.fulfilled"', () => {
      const stubShortOffer = makeFakeShortOffer({});
      const stubOffer = makeFakeOffer({shortOffer: stubShortOffer});
      const stubFullOffer = {
        ...stubOffer,
        previewImage: stubShortOffer.previewImage
      };

      const initialState = {
        currentCity: DEFAULT_CITY,
        offers: [stubShortOffer],
        favoriteOffers: stubFullOffer.isFavorite ? [stubFullOffer] : [],
        cityOffers: [stubShortOffer],
        nearbyOffers: [stubShortOffer],
        currentOffer: stubOffer,
        currentOfferReviews: [],
        sortType: defaultSort,
        isLoading: false,
        isNoCurrentOffer: false,
        isFormDisabled: false,
      };

      const updatedFullOffer = {
        ...stubFullOffer,
        isFavorite: !stubFullOffer.isFavorite
      };

      const updatedOffers = [{...stubShortOffer, isFavorite: updatedFullOffer.isFavorite}];

      const expectedState = {
        currentCity: DEFAULT_CITY,
        offers: updatedOffers,
        favoriteOffers: updatedFullOffer.isFavorite ? [updatedFullOffer] : [],
        cityOffers: updatedOffers,
        nearbyOffers: updatedOffers,
        currentOffer: {...stubOffer, isFavorite: updatedFullOffer.isFavorite},
        currentOfferReviews: [],
        sortType: defaultSort,
        isLoading: false,
        isNoCurrentOffer: false,
        isFormDisabled: false,
      };

      const result = dataProcess.reducer(initialState, setOfferFavoriteStatusAction.fulfilled(updatedFullOffer, '', {offerId: updatedFullOffer.id, isFavorite: updatedFullOffer.isFavorite}));
      expect(result).toEqual(expectedState);
    });

    describe('fetchOfferScreenInfo tests', () => {
      it('Should set "currentOffer" to Offer, "currentOfferReviews" to array of Reviews, "nearbyOffers" to array of ShortOffers and "isNoCurrentOffer" to "false" in case of "fetchOfferScreenInfoAction.fulfilled"', () => {
        const expectedState = {
          ...defaultState,
          nearbyOffers: stubNearbyOffers,
          currentOffer: stubCurrentOffer,
          currentOfferReviews: stubCurrentOfferReviews,
          isNoCurrentOffer: false,
        };

        const result = dataProcess.reducer(undefined, fetchOfferScreenInfoAction.fulfilled(
          {
            currentOffer: stubCurrentOffer,
            reviews: stubCurrentOfferReviews,
            nearbyOffers: stubNearbyOffers
          },
          '',
          {offerId: stubCurrentOffer.id})
        );

        expect(result).toEqual(expectedState);
      });

      it('Should set "isNoCurrentOffer" to "true" in case of "fetchOfferScreenInfoAction.rejected"', () => {
        const result = dataProcess.reducer(undefined, fetchOfferScreenInfoAction.rejected);
        expect(result.isNoCurrentOffer).toBe(true);
      });
    });

    describe('postNewOfferReview', () => {
      it('Should set "isFormDisabled" to "true" in case of "postNewOfferReviewAction.pending"', () => {
        const result = dataProcess.reducer(undefined, postNewOfferReviewAction.pending);
        expect(result.isFormDisabled).toBe(true);
      });

      it('Should add newReview to currentOfferReviews and set "isFormDisabled" to "false" in case of "postNewOfferReviewAction.fulfilled"', () => {
        const newReview = makeFakeReview();

        const initialState = {
          ...defaultState,
          isFormDisabled: true
        };

        const expectedState = {
          ...defaultState,
          currentOfferReviews: [newReview],
          isFormDisabled: false
        };

        const result = dataProcess.reducer(initialState, postNewOfferReviewAction.fulfilled(
          newReview,
          '',
          {
            offerId: newReview.id,
            reviewData: {
              rating: newReview.rating,
              comment: newReview.comment
            }
          }));
        expect(result).toEqual(expectedState);
      });

      it('Should set "isFormDisabled" to "false" in case of "postNewOfferReviewAction.rejected"', () => {
        const result = dataProcess.reducer(undefined, postNewOfferReviewAction.rejected);
        expect(result.isFormDisabled).toBe(false);
      });
    });

    it('Should set "favoriteOffers" to empty array in case of "logoutAction.fulfilled"', () => {
      const initialState = {
        ...defaultState,
        favoriteOffers: [makeFakeFullOffer({})]
      };

      const result = dataProcess.reducer(initialState, logoutAction.fulfilled);
      expect(result.favoriteOffers).toEqual([]);
    });
  });
});
