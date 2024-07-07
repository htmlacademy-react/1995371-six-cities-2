import { FullOffersPack, Offer, OfferFull, Offers } from '../types/offers';
import { isString } from './utils';

const getOffer = (offers: Offers, id: string | undefined): Offer | undefined => isString(id) ? offers.find((offer) => id && offer.id === id) : undefined;
const getFullOffer = (offers: FullOffersPack, id: string | undefined): OfferFull | undefined => isString(id) ? offers[id] : undefined;

export { getOffer, getFullOffer };
