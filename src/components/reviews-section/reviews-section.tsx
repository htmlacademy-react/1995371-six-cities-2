import { AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';
import { TReviews } from '../../types/reviews';

import ReviewForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsSectionProps = {
  reviews: TReviews;
}

export default function ReviewsSection({
  reviews
}: ReviewsSectionProps): React.JSX.Element {

  const currentAuthorizationStatus = useAppSelector((store) => store.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {currentAuthorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null}
    </section>
  );
}
