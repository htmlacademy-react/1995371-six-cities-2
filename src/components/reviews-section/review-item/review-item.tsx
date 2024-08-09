import { TReview } from '../../../types/reviews';

import { RatingViewMode } from '../../../const/mode';
import { huminizeDateString } from '../../../utils/date-utils';
import Rating from '../../shared/rating/rating';

type ReviewProps = {
  review: TReview;
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
            data-testid='review author avatar'
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating offerRating={review.rating} ratingViewMode={RatingViewMode.Reviews}/>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>{huminizeDateString(review.date)}</time>
      </div>
    </li>
  );
}
