import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const/const';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { TState } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<TState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Should redirect to "/login"', () => {
    const redirectToLoginPageAction = redirectToRoute({route: AppRoute.Login});
    store.dispatch(redirectToLoginPageAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('Should redirect to "/offer/someId"', () => {
    const route = `${AppRoute.OfferBase}/someId`;
    const redirectToOfferPageAction = redirectToRoute({route: AppRoute.OfferBase, parameter: 'someId'});
    store.dispatch(redirectToOfferPageAction);
    expect(browserHistory.location.pathname).toBe(route);
  });

  it('Should not redirect to "/offer/someId" in case of emptyAction', () => {
    const route = `${AppRoute.OfferBase}/someId`;
    const emptyAction = {
      type: '',
      payload: {route: AppRoute.OfferBase, parameter: 'someId'}
    };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(route);
  });
});
