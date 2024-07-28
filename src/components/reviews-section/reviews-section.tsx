import { AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { getCurrentOfferReviews } from '../../store/data-process/data-process.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

import ReviewForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

export default function ReviewsSection(): React.JSX.Element {

  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getCurrentOfferReviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {currentAuthorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null}
    </section>
  );
}
