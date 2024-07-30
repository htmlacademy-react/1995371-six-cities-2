import { memo } from 'react';
import { TAccommodation } from '../../../types/offers';

type FeaturesListProps = {
  accommodationType: TAccommodation;
  bedroomsAmount: number;
  maxAdultsAmount: number;
}

function FeaturesList({
  accommodationType,
  bedroomsAmount,
  maxAdultsAmount
}: FeaturesListProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire" key="accommodationType">{accommodationType}</li>
      <li className="offer__feature offer__feature--bedrooms" key="bedroomsAmount">{`${bedroomsAmount} ${bedroomsAmount === 1 ? 'Bedroom' : 'Bedrooms'}`}</li>
      <li className="offer__feature offer__feature--adults" key="maxAdultsAmount">{`Max ${maxAdultsAmount} ${maxAdultsAmount === 1 ? 'adult' : 'adults'}`}</li>
    </ul>
  );
}

const FeaturesListMemo = memo(FeaturesList);

export default FeaturesListMemo;
