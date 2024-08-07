import { TRatingViewMode } from '../../../types/common';

import { RatingViewMode } from '../../../const/mode';
import { roundToInteger } from '../../../utils/utils';
import { memo } from 'react';

type RatingProps = {
  offerRating: number;
  ratingViewMode?: TRatingViewMode;
}

function Rating({
  offerRating,
  ratingViewMode = RatingViewMode.Card
}: RatingProps): React.JSX.Element {
  const ratingWidthValue = `${2 * roundToInteger(offerRating)}0%`;
  return (
    <div className={`${ratingViewMode}__rating rating`} data-testid='rating container'>
      <div className={`${ratingViewMode}__stars rating__stars`}>
        <span style={{width: ratingWidthValue}} data-testid='rating stars'></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

const RatingMemo = memo(Rating);

export default RatingMemo;
