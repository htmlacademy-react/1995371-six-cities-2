import { TReviewState } from '../types/reviews';

const ReviewLength = {
  MinLength: 50,
  MaxLength: 300
} as const;

const ReviewInitStateValue: TReviewState = {
  rating: 0,
  comment: '',
} as const;

export { ReviewLength, ReviewInitStateValue };
