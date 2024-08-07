import { SortActionMode } from '../const/mode';
import { SortPack } from '../utils/sort-utils';

export type TSortType = typeof SortPack;
export type TSortName = keyof TSortType;
export type TSortActionMode = SortActionMode;
