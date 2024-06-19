import { Offers } from '../types/offers';

const getOffer = (offers: Offers, id: string) => offers.find((offer) => offer.id === id);

export { getOffer };
