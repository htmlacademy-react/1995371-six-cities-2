import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '../../const/store';
import browserHistory from '../../browser-history';
import { TRedirectRoute } from '../../types/api';
import { rootReducer } from '../root-reducer';

type TReducer = ReturnType<typeof rootReducer>;

const redirect: Middleware<unknown, TReducer> = () => (next) =>
  (action: PayloadAction<TRedirectRoute>) => {
    if (action.type === Action.RedirectToRoute) {
      const route = `${action.payload.route}${action.payload.parameter ? `/${action.payload.parameter}` : ''}`;
      browserHistory.push(route);
    }

    return next(action);
  };

export { redirect };
