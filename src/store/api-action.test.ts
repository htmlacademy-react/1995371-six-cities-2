import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { TState } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes, makeFakeFullOffer, makeFakeOffer, makeFakeReview, makeFakeShortOffer, makeFakeUser } from '../utils/mocks';
import { StoreNameSpace } from '../const/store';
import { DEFAULT_CITY } from '../const/citypack';
import { defaultSort } from '../utils/sort-utils';
import { AuthorizationStatus } from '../const/const';
import { APIRoute, FavoriteStatusPathNumber } from '../const/api';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction, fetchOfferScreenInfoAction, loginAction, logoutAction, postNewOfferReviewAction, setOfferFavoriteStatusAction } from './api-action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  const initialState = {
    [StoreNameSpace.Data]: {
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
    },
    [StoreNameSpace.User]:  {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: '',
    }
  };

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(initialState);
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" in case of server\'s response 200', async () => {
      const stubOffers = [makeFakeShortOffer({})];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, stubOffers);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchOffersFulfilledAction = actions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(actionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type
      ]);

      expect(fetchOffersFulfilledAction.payload).toEqual(stubOffers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" in case of server\'s response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(404);
      await store.dispatch(fetchOffersAction());
      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type
      ]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.fulfilled" in case of server\'s response 200', async () => {
      const stubFavoriteOffers = [makeFakeFullOffer({})];
      mockAxiosAdapter.onGet(APIRoute.FavoriteOffers).reply(200, stubFavoriteOffers);

      await store.dispatch(fetchFavoriteOffersAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchFavoriteOffersFulfilledAction = actions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(actionTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type
      ]);

      expect(fetchFavoriteOffersFulfilledAction.payload).toEqual(stubFavoriteOffers);
    });

    it('should dispatch "fetchFavoriteOffersAction.pending" and "fetchFavoriteOffersAction.rejected" in case of server\'s response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.FavoriteOffers).reply(401);
      await store.dispatch(fetchFavoriteOffersAction());
      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type
      ]);
    });
  });

  describe('setOfferFavoriteStatusAction', () => {
    it('should dispatch "setOfferFavoriteStatusAction.pending" and "setOfferFavoriteStatusAction.fulfilled" in case of server\'s response 200', async () => {
      const stubFullOffer = makeFakeFullOffer({});
      stubFullOffer.isFavorite = false;

      const stubFavoriteInfo = {
        offerId: stubFullOffer.id,
        isFavorite: stubFullOffer.isFavorite
      };

      const url = new RegExp(`^(${APIRoute.FavoriteOffers}/${stubFavoriteInfo.offerId}/${FavoriteStatusPathNumber.Remove})$`);
      mockAxiosAdapter.onPost(url).reply(200, stubFullOffer);

      await store.dispatch(setOfferFavoriteStatusAction(stubFavoriteInfo));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const setOfferFavoriteStatusFulfilledAction = actions.at(1) as ReturnType<typeof setOfferFavoriteStatusAction.fulfilled>;

      expect(actionTypes).toEqual([
        setOfferFavoriteStatusAction.pending.type,
        setOfferFavoriteStatusAction.fulfilled.type
      ]);

      expect(setOfferFavoriteStatusFulfilledAction.payload).toEqual(stubFullOffer);
    });

    it('should dispatch "setOfferFavoriteStatusAction.pending" and "setOfferFavoriteStatusAction.fulfilled" in case of server\'s response 201', async () => {
      const stubFullOffer = makeFakeFullOffer({});
      stubFullOffer.isFavorite = true;

      const stubFavoriteInfo = {
        offerId: stubFullOffer.id,
        isFavorite: stubFullOffer.isFavorite
      };

      const url = new RegExp(`^(${APIRoute.FavoriteOffers}/${stubFavoriteInfo.offerId}/${FavoriteStatusPathNumber.Add})$`);
      mockAxiosAdapter.onPost(url).reply(201, stubFullOffer);

      await store.dispatch(setOfferFavoriteStatusAction(stubFavoriteInfo));
      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const setOfferFavoriteStatusFulfilledAction = actions.at(1) as ReturnType<typeof setOfferFavoriteStatusAction.fulfilled>;

      expect(actionTypes).toEqual([
        setOfferFavoriteStatusAction.pending.type,
        setOfferFavoriteStatusAction.fulfilled.type
      ]);

      expect(setOfferFavoriteStatusFulfilledAction.payload).toEqual(stubFullOffer);
    });

    it('should dispatch "setOfferFavoriteStatusAction.pending" and "setOfferFavoriteStatusAction.rejected" in case of server\'s response 400', async () => {

      const stubFavoriteInfo = {
        offerId: '',
        isFavorite: true
      };

      const url = new RegExp(`^(${APIRoute.FavoriteOffers}/${stubFavoriteInfo.offerId}/.*)$`);
      mockAxiosAdapter.onPost(url).reply(400);

      await store.dispatch(setOfferFavoriteStatusAction(stubFavoriteInfo));
      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        setOfferFavoriteStatusAction.pending.type,
        setOfferFavoriteStatusAction.rejected.type
      ]);
    });
  });

  describe('fetchOfferScreenInfoAction', () => {
    it('should dispatch "fetchOfferScreenInfoAction.pending" and "fetchOfferScreenInfoAction.fulfilled" in case of server\'s response 200', async () => {
      const stubCurrentOffer = makeFakeOffer({});
      const {id} = stubCurrentOffer;
      const stubReviews = [makeFakeReview()];
      const stubNearbyOffers = [makeFakeShortOffer({})];

      const expectedPayload = {
        currentOffer: stubCurrentOffer,
        reviews: stubReviews,
        nearbyOffers: stubNearbyOffers
      };

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(200, stubCurrentOffer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, stubReviews);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`).reply(200, stubNearbyOffers);

      await store.dispatch(fetchOfferScreenInfoAction({offerId: id}));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const fetchOfferScreenInfoFulfilledAction = actions.at(1) as ReturnType<typeof fetchOfferScreenInfoAction.fulfilled>;

      expect(actionTypes).toEqual([
        fetchOfferScreenInfoAction.pending.type,
        fetchOfferScreenInfoAction.fulfilled.type
      ]);

      expect(fetchOfferScreenInfoFulfilledAction.payload).toEqual(expectedPayload);
    });

    it('should dispatch "fetchOfferScreenInfoAction.pending" and "fetchOfferScreenInfoAction.rejected" in case of any server\'s response 404', async () => {
      const stubCurrentOffer = makeFakeOffer({});
      const {id} = stubCurrentOffer;
      const stubReviews = [makeFakeReview()];
      const stubNearbyOffers = [makeFakeShortOffer({})];

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(404);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, stubReviews);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`).reply(200, stubNearbyOffers);

      await store.dispatch(fetchOfferScreenInfoAction({offerId: id}));

      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        fetchOfferScreenInfoAction.pending.type,
        fetchOfferScreenInfoAction.rejected.type
      ]);
    });

    it('should dispatch "fetchOfferScreenInfoAction.pending" and "fetchOfferScreenInfoAction.rejected" in case of any server\'s response 404', async () => {
      const stubCurrentOffer = makeFakeOffer({});
      const {id} = stubCurrentOffer;
      const stubNearbyOffers = [makeFakeShortOffer({})];

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(200, stubCurrentOffer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(404);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`).reply(200, stubNearbyOffers);

      await store.dispatch(fetchOfferScreenInfoAction({offerId: id}));

      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        fetchOfferScreenInfoAction.pending.type,
        fetchOfferScreenInfoAction.rejected.type
      ]);
    });

    it('should dispatch "fetchOfferScreenInfoAction.pending" and "fetchOfferScreenInfoAction.rejected" in case of any server\'s response 404', async () => {
      const stubCurrentOffer = makeFakeOffer({});
      const {id} = stubCurrentOffer;
      const stubReviews = [makeFakeReview()];

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(200, stubCurrentOffer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, stubReviews);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.NearbyOffers}`).reply(404);

      await store.dispatch(fetchOfferScreenInfoAction({offerId: id}));

      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        fetchOfferScreenInfoAction.pending.type,
        fetchOfferScreenInfoAction.rejected.type
      ]);
    });
  });

  describe('postNewOfferReviewAction', () => {
    it('should dispatch "postNewOfferReviewAction.pending" and "postNewOfferReviewAction.fulfilled" in case of server\'s response 200', async () => {
      const stubReview = makeFakeReview();
      const url = new RegExp(`${APIRoute.Comments}/*`);
      mockAxiosAdapter.onPost(url).reply(200, stubReview);

      await store.dispatch(postNewOfferReviewAction({
        offerId: 'testId',
        reviewData: {
          rating: stubReview.rating,
          comment: stubReview.comment
        }
      }));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const postNewOfferReviewFulfilledAction = actions.at(1) as ReturnType<typeof postNewOfferReviewAction.fulfilled>;

      expect(actionTypes).toEqual([
        postNewOfferReviewAction.pending.type,
        postNewOfferReviewAction.fulfilled.type
      ]);

      expect(postNewOfferReviewFulfilledAction.payload).toEqual(stubReview);
    });

    it('should dispatch "postNewOfferReviewAction.pending" and "postNewOfferReviewAction.rejected" in case of server\'s response 400', async () => {
      const stubReview = makeFakeReview();
      const url = new RegExp(`${APIRoute.Comments}/*`);
      mockAxiosAdapter.onPost(url).reply(400);

      await store.dispatch(postNewOfferReviewAction({
        offerId: 'testId',
        reviewData: {
          rating: stubReview.rating,
          comment: stubReview.comment
        }
      }));

      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        postNewOfferReviewAction.pending.type,
        postNewOfferReviewAction.rejected.type
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" in case of server\'s response 200', async () => {
      const stubUser = makeFakeUser();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, stubUser);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
      const checkAuthFulfilledAction = actions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(actionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);

      expect(checkAuthFulfilledAction.payload).toEqual(stubUser);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" in case of server\'s response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());

      const actionTypes = extractActionsTypes(store.getActions());

      expect(actionTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('', async () => {
      const stubUser = makeFakeUser();
      const stubAuthData = {
        email: stubUser.email,
        password: 'testPassword'
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, stubUser);

      await store.dispatch(loginAction(stubAuthData));

      const actions = store.getActions();
      const actionTypes = extractActionsTypes(actions);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" in case of server\'s response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actionTypes = extractActionsTypes(store.getActions());
      expect(actionTypes).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);
    });

    it('should dispatch "logoutAction.pending" and "logoutAction.rejected" in case of server\'s response 404', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(404);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type
      ]);
    });
  });
});
