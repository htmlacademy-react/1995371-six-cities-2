import { ReviewLength } from '../const/review-const';
import { TOffersPack, TShortOffer, TOffer, TShortOffers } from '../types/offers';
import { isString } from './type-guard';

const getOffer = (offers: TShortOffers, id: string | undefined): TShortOffer | undefined => isString(id) ? offers.find((offer) => id && offer.id === id) : undefined;
const getFullOffer = (offers: TOffersPack, id: string | undefined): TOffer | undefined => isString(id) ? offers[id] : undefined;

const isCommentsLengthValid = (comment: string) => (comment.length >= ReviewLength.MinLength && comment.length <= ReviewLength.MaxLength);

export { getOffer, getFullOffer, isCommentsLengthValid };
