import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import { Action } from '../../const/action';
import browserHistory from '../../browser-history';

type TReducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, TReducer> = () => (next) =>
  (action: PayloadAction<string>) => {
    if (action.type === Action.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

export { redirect };
