import { SortActionMode } from '../const/mode';
import { SortPack } from '../const/sort';

export type TSortType = typeof SortPack;
export type TSortName = keyof TSortType;
export type TSortActionMode = SortActionMode;
