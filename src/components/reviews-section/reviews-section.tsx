import { TReviews } from '../../types/reviews';

import ReviewForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsSectionProps = {
  offerId: string;
  reviews: TReviews;
}

export default function ReviewsSection({
  offerId,
  reviews
}: ReviewsSectionProps): React.JSX.Element {

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      <ReviewForm offerId={offerId}/>
    </section>
  );
}
