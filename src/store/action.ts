import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offers';

export const updateCurrentCity = createAction<{newCity: City}>('updateCurrentCity');
export const updateOffersList = createAction<{newOffers: Offers}>('getOffersList');
export const resetOffersList = createAction('resetOffersList');
