import { TPriceViewMode } from '../../../types/common';

import { PriceViewMode } from '../../../const/mode';

type OfferPriceProps = {
  offerPrice: number;
  priceViewMode?: TPriceViewMode;
}

export default function OfferPrice({
  offerPrice,
  priceViewMode = PriceViewMode.Card
}: OfferPriceProps): React.JSX.Element {
  return (
    <div className={`${priceViewMode}__price`}>
      <b className={`${priceViewMode}__price-value`}>&euro;{offerPrice}</b>
      <span className={`${priceViewMode}__price-text`}>&#47;&nbsp;night</span>
    </div>
  );
}
