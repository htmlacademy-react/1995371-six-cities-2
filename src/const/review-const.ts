import { reviewState } from '../types/reviews';

const reviewInitStateValue: reviewState = {
  rating: 0,
  reviewText: '',
} as const;

export { reviewInitStateValue };
