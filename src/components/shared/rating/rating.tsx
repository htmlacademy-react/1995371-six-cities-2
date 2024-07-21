import { TRatingViewMode } from '../../../types/common';

import { RatingViewMode } from '../../../const/mode';
import { roundToInteger } from '../../../utils/utils';

type RatingProps = {
  offerRating: number;
  ratingViewMode?: TRatingViewMode;
}

export default function Rating({
  offerRating,
  ratingViewMode = RatingViewMode.Card
}: RatingProps): React.JSX.Element {
  const ratingWidthValue = `${2 * roundToInteger(offerRating)}0%`;

  return (
    <div className={`${ratingViewMode}__rating rating`}>
      <div className={`${ratingViewMode}__stars rating__stars`}>
        <span style={{width: ratingWidthValue}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
