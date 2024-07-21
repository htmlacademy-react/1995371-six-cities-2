import { TFullOffersPack, TOffer, TOfferFull, TOffers } from '../types/offers';
import { isString } from './type-guard';

const getOffer = (offers: TOffers, id: string | undefined): TOffer | undefined => isString(id) ? offers.find((offer) => id && offer.id === id) : undefined;
const getFullOffer = (offers: TFullOffersPack, id: string | undefined): TOfferFull | undefined => isString(id) ? offers[id] : undefined;

export { getOffer, getFullOffer };
