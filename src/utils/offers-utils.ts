import { Offers } from '../types/offers';

const getOffer = (offers: Offers, id: string | undefined) => offers.find((offer) => id && offer.id === id);

export { getOffer };
