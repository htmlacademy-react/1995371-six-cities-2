import { Reviews } from '../../types/reviews';

import { RatingViewModeOption } from '../../const';
import ReviewForm from '../reviews-form/reviews-form';
import Rating from '../shared/rating/rating';

type ReviewsSectionProps = {
  offerId: string;
  reviews: Reviews;
}

export default function ReviewsSection({
  offerId,
  reviews
}: ReviewsSectionProps): React.JSX.Element {
  const reviewsList = (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <li className="reviews__item" key={review.id}>
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
      ))}
    </ul>
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviewsList}
      <ReviewForm offerId={offerId}/>
    </section>
  );
}
