import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { TState } from '../types/state';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';

export function withHistory(component: React.JSX.Element, history?: MemoryHistory): React.JSX.Element {
  const memoryHistory = history ?? createMemoryHistory();
  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type TComponentWithStore = {
  withStoreComponent: React.JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: React.JSX.Element,
  initialState: Partial<TState> = {}
):TComponentWithStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
}
