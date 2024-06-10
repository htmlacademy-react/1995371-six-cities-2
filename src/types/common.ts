import { PlaceCardModeOption } from '../const';
import { FilterType } from '../const';

export type PlaceCardMode = typeof PlaceCardModeOption.Default | typeof PlaceCardModeOption.Favorite;
export type Filter = typeof FilterType.City | typeof FilterType.Favorite;
