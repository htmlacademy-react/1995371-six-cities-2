const ClassnameActionModeOption = {
  Add: 'Add',
  Remove: 'Remove'
} as const;

const SortActionModeOption = {
  Open: 'Open',
  Close: 'Close'
} as const;

const PlaceCardModeOption = {
  Default: 'default',
  Favorite: 'favorite'
} as const;

const HeaderModeOption = {
  LoginScreen: 'loginScreen',
  Default: 'default'
} as const;

const RatingViewModeOption = {
  Card: 'place-card',
  Offer: 'offer',
  Reviews: 'reviews'
} as const;

const BookmarkButtonModeOption = {
  Card: 'place-card',
  Offer: 'offer',
} as const;

const PriceViewModeOption = {
  Card: 'place-card',
  Offer: 'offer',
} as const;

export {
  ClassnameActionModeOption,
  SortActionModeOption,
  PlaceCardModeOption,
  HeaderModeOption,
  RatingViewModeOption,
  BookmarkButtonModeOption,
  PriceViewModeOption,
};
