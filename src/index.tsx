import React from 'react';
import ReactDOM from 'react-dom/client';

import { offers } from './mocks/offers';
import { reviewsPack } from './mocks/reviews';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      reviewsPack={reviewsPack}
    />
  </React.StrictMode>
);
