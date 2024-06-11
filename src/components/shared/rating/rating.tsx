import { RatingViewMode } from '../../../types/common';

import { RatingViewModeOption } from '../../../const';
import { getInteger } from '../../../utils/utils';

type RatingProps = {
  offerRating: number;
  ratingViewMode?: RatingViewMode;
}

export default function Rating({
  offerRating,
  ratingViewMode = RatingViewModeOption.Card
}: RatingProps): React.JSX.Element {
  const ratingWidthValue = `${2 * getInteger(offerRating)}0%`;

  return (
    <div className={`${ratingViewMode}__rating rating`}>
      <div className={`${ratingViewMode}__stars rating__stars`}>
        <span style={{width: ratingWidthValue}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
