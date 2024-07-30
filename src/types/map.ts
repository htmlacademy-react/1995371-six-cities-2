import { TShortOffer } from './offers';

export type TPoint = Pick<TShortOffer, 'id' | 'title' | 'location'>;
export type TPoints = TPoint[];
