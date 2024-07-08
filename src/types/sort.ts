import { SortActionModeOption } from '../const/mode';
import { SortPack } from '../const/sort';

export type SortType = typeof SortPack;
export type SortName = keyof SortType;
export type SortActionMode = keyof typeof SortActionModeOption;
