import { AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';

import ReviewForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

export default function ReviewsSection(): React.JSX.Element {

  const currentAuthorizationStatus = useAppSelector((store) => store.authorizationStatus);
  const reviews = useAppSelector((store) => store.currentOfferReviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {currentAuthorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null}
    </section>
  );
}
