import { TFullOffersPack, TOffer, TOfferFull, Offers } from '../types/offers';
import { isString } from './type-quard';

const getOffer = (offers: Offers, id: string | undefined): TOffer | undefined => isString(id) ? offers.find((offer) => id && offer.id === id) : undefined;
const getFullOffer = (offers: TFullOffersPack, id: string | undefined): TOfferFull | undefined => isString(id) ? offers[id] : undefined;

export { getOffer, getFullOffer };
