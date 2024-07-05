import React from 'react';
import ReactDOM from 'react-dom/client';

import { offers, fullOffersPack } from './mocks/offers';
import { reviewsPack } from './mocks/reviews';
import { CityPack } from './const/citypack';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      fullOffersPack={fullOffersPack}
      reviewsPack={reviewsPack}
      cityPack={CityPack}
    />
  </React.StrictMode>
);
