import { Offer } from './offers';

export type Point = Pick<Offer, 'id' | 'title' | 'location'>;
export type Points = Point[];
