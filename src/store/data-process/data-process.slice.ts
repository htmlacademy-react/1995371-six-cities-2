import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const/citypack';
import { defaultSort, SortPack } from '../../utils/sort-utils';
import { TDataProcessInitialState } from '../../types/state';
import { StoreNameSpace } from '../../const/store';
import { fetchFavoriteOffersAction, fetchOffersAction, fetchOfferScreenInfoAction, postNewOfferReviewAction, setOfferFavoriteStatusAction } from '../api-action';
import { getCityFilteredOffers } from '../../utils/filter-utils';
import { TCity } from '../../types/city';
import { TSortName } from '../../types/sort';
import { isKnownCityName, isKnownSortName } from '../../utils/type-guard';

const initialState: TDataProcessInitialState = {
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

export const dataProcess = createSlice({
  name: StoreNameSpace.Data,
  initialState,
  reducers: {
    updateCurrentCity: {
      reducer: (state, action: PayloadAction<TCity>) => {
        state.currentCity = action.payload;
      },
      prepare: (city: TCity) => {
        if (!isKnownCityName(city.name)) {
          throw new Error('Unknown city');
        }

        return {payload: city};
      }
    },
    updateSortType: {
      reducer: (state, action: PayloadAction<TSortName>) => {
        const currentSortType = state.sortType;
        const newSortType = action.payload;

        if(newSortType === currentSortType) {
          return;
        }

        state.sortType = newSortType;
      },
      prepare: (sortType: TSortName) => {
        if (!isKnownSortName(sortType)) {
          throw new Error('Unknown sort type');
        }

        return {payload: sortType};
      }
    },
    updateCityOffersList: (state) => {
      const initialCityOffers = state.cityOffers.length
        ? state.cityOffers
        : getCityFilteredOffers(state.offers, state.currentCity.name);
      switch (state.sortType) {
        case SortPack.Popular.Alias:
          state.cityOffers = SortPack[state.sortType].SortFunction(state.offers, state.currentCity);
          break;

        default:
          state.cityOffers = SortPack[state.sortType].SortFunction(initialCityOffers);
          break;
      }
    },
    clearOfferScreenInfo: (state) => {
      state.currentOffer = null;
      state.currentOfferReviews = [];
      state.nearbyOffers = [];
      state.isNoCurrentOffer = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
        switch (state.sortType) {
          case SortPack.Popular.Alias:
            state.cityOffers = getCityFilteredOffers(state.offers, state.currentCity.name);
            break;

          default:
            state.cityOffers = SortPack[state.sortType].SortFunction(state.cityOffers);
            break;
        }
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(setOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const {id: handledOfferId, isFavorite: handledOfferIsFavorite} = action.payload;

        if (state.currentOffer?.id === handledOfferId) {
          state.currentOffer = {
            ...state.currentOffer,
            isFavorite: handledOfferIsFavorite
          };
        }

        state.offers = state.offers.map((offer) => (
          offer.id === handledOfferId
            ? {...offer, isFavorite: handledOfferIsFavorite}
            : offer
        ));

        state.cityOffers = state.cityOffers.map((offer) => (
          offer.id === handledOfferId
            ? {...offer, isFavorite: handledOfferIsFavorite}
            : offer
        ));

        state.nearbyOffers = state.nearbyOffers.map((offer) => (
          offer.id === handledOfferId
            ? {...offer, isFavorite: handledOfferIsFavorite}
            : offer
        ));

        state.favoriteOffers = handledOfferIsFavorite
          ? [...state.favoriteOffers, action.payload]
          : [...state.favoriteOffers.filter((offer) => offer.id !== handledOfferId)];
      })
      .addCase(fetchOfferScreenInfoAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload.currentOffer;
        state.currentOfferReviews = action.payload.reviews;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.isNoCurrentOffer = false;
      })
      .addCase(fetchOfferScreenInfoAction.rejected, (state) => {
        state.isNoCurrentOffer = true;
      })
      .addCase(postNewOfferReviewAction.pending, (state) => {
        state.isFormDisabled = true;
      })
      .addCase(postNewOfferReviewAction.fulfilled, (state, action) => {
        state.currentOfferReviews = [...state.currentOfferReviews, action.payload];
        state.isFormDisabled = false;
      })
      .addCase(postNewOfferReviewAction.rejected, (state) => {
        state.isFormDisabled = false;
      });
  }
});

export const {updateCurrentCity, updateSortType, updateCityOffersList, clearOfferScreenInfo} = dataProcess.actions;
