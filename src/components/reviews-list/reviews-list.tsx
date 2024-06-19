import { Reviews } from '../../types/reviews';
import ReviewItem from '../review/review';

type ReviewsListProps = {
  reviews: Reviews;
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
