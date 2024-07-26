import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const/citypack';
import { defaultSort, SortPack } from '../../const/sort';
import { TDataProcessInitialState } from '../../types/state';
import { StoreNameSpace } from '../../const/store';
import { fetchFavoriteOffers, fetchOffersAction, fetchOfferScreenInfo, postNewOfferReviewAction, setOfferFavoriteStatus } from '../api-action';
import { getCityFilteredOffers } from '../../utils/filter-utils';
import { TCity } from '../../types/city';
import { TSortName } from '../../types/sort';
import { isKnownSortName } from '../../utils/type-guard';

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
  isCityOffers: false,
  isNoCurrentOffer: false,
  isFormDisabled: false,
};

export const dataProcess = createSlice({
  name: StoreNameSpace.Data,
  initialState,
  reducers: {
    updateCurrentCity: (state, action: PayloadAction<TCity>) => {
      state.currentCity = action.payload;
    },
    updateSortType: (state, action: PayloadAction<TSortName>) => {
      const currentSortType = state.sortType;
      const newSortType = action.payload;

      if(!newSortType || newSortType === currentSortType || !isKnownSortName(newSortType)) {
        return;
      }

      state.sortType = newSortType;
    },
    updateCityOffersList: (state) => {
      switch (state.sortType) {
        case SortPack.Popular.Alias:
          state.cityOffers = getCityFilteredOffers(state.offers, state.currentCity.name);
          break;

        default:
          state.cityOffers = SortPack[state.sortType].SortFunction(state.cityOffers);
          break;
      }
      state.isCityOffers = !!state.cityOffers.length;
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
        state.isCityOffers = !!state.cityOffers.length;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(setOfferFavoriteStatus.fulfilled, (state, action) => {
        const currentOffer = action.payload;
        const currentId = currentOffer.id;
        const {isFavorite} = currentOffer;

        state.offers = state.offers.map((offer) => (
          offer.id === currentId
            ? {...offer, isFavorite: isFavorite}
            : offer
        ));

        state.cityOffers = state.cityOffers.map((offer) => (
          offer.id === currentId
            ? {...offer, isFavorite: isFavorite}
            : offer
        ));

        state.favoriteOffers = isFavorite
          ? [...state.favoriteOffers, currentOffer]
          : state.favoriteOffers.filter((offer) => offer.id !== currentId);
      })
      .addCase(fetchOfferScreenInfo.fulfilled, (state, action) => {
        state.currentOffer = action.payload.currentOffer;
        state.currentOfferReviews = action.payload.reviews;
        state.nearbyOffers = action.payload.nearbyOffers;
      })
      .addCase(fetchOfferScreenInfo.rejected, (state) => {
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
