import { createAction } from '@reduxjs/toolkit';
import { TRedirectRoute } from '../types/api';
import { Action } from '../const/action';

export const redirectToRoute = createAction<TRedirectRoute>(Action.RedirectToRoute);
