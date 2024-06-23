import { Review } from '../../../types/reviews';

import { RatingViewModeOption } from '../../../const/const';
import Rating from '../../shared/rating/rating';

type ReviewProps = {
  review: Review;
}

export default function ReviewItem({review}: ReviewProps): React.JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating offerRating={review.rating} ratingViewMode={RatingViewModeOption.Reviews}/>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>April 2019</time>
      </div>
    </li>
  );
}
