import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import { Action } from '../../const/action';
import browserHistory from '../../browser-history';
import { TRedirectRoute } from '../../types/api';

type TReducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, TReducer> = () => (next) =>
  (action: PayloadAction<TRedirectRoute>) => {
    if (action.type === Action.RedirectToRoute) {
      const route = `${action.payload.route}${action.payload.parameter ? `/${action.payload.parameter}` : ''}`;
      browserHistory.push(route);
    }

    return next(action);
  };

export { redirect };
