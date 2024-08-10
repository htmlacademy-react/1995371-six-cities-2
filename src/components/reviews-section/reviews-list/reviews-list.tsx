import { TReviews } from '../../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: TReviews;
}

export default function ReviewsList({reviews}: ReviewsListProps): React.JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem review={review} key={review.id}/>
      ))}
    </ul>
  );
}
