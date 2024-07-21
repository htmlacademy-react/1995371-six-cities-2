import { TReviewState } from '../types/reviews';

const reviewInitStateValue: TReviewState = {
  rating: 0,
  reviewText: '',
} as const;

export { reviewInitStateValue };
