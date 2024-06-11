import { PlaceCardModeOption, FilterType, HeaderModeOption } from '../const';

export type PlaceCardMode = typeof PlaceCardModeOption.Default | typeof PlaceCardModeOption.Favorite;
export type Filter = typeof FilterType.City | typeof FilterType.Favorite;
export type HeaderMode = typeof HeaderModeOption.LoginScreen | typeof HeaderModeOption.Default;
