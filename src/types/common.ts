import {
  FilterType,
  PlaceCardModeOption,
  HeaderModeOption,
  RatingViewModeOption,
  BookmarkButtonModeOption,
  PriceViewModeOption
} from '../const';

export type Filter = typeof FilterType.City | typeof FilterType.Favorite;
export type PlaceCardMode = typeof PlaceCardModeOption.Default | typeof PlaceCardModeOption.Favorite;
export type HeaderMode = typeof HeaderModeOption.LoginScreen | typeof HeaderModeOption.Default;
export type RatingViewMode = typeof RatingViewModeOption.Card | typeof RatingViewModeOption.Offer | typeof RatingViewModeOption.Reviews;
export type BookmarkButtonMode = typeof BookmarkButtonModeOption.Card | typeof BookmarkButtonModeOption.Offer;
export type PriceViewMode = typeof PriceViewModeOption.Card | typeof PriceViewModeOption.Offer;
