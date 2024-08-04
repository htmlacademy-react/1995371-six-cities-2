import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';

import { CityPack } from './const/citypack';

import App from './components/app/app';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from './store/api-action';
import { ToastContainer } from 'react-toastify';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        cityPack={CityPack}
      />
    </Provider>
  </React.StrictMode>
);
