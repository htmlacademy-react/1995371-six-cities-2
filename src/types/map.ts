import { TOffer } from './offers';

export type TPoint = Pick<TOffer, 'id' | 'title' | 'location'>;
export type TPoints = TPoint[];
