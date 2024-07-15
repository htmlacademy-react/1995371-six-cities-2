export type TReviewState = {
  rating: number;
  reviewText: string;
}

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TReview = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}

export type TReviews = TReview[]

export type TReviewsPack = {
  [id: string]: TReviews;
}
