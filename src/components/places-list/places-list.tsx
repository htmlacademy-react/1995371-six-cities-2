import React from 'react';

import { Offers, OfferShort } from '../../types/offers';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offers;
}

export default function PlacesList({offers}: PlacesListProps): React.JSX.Element {
  return (
    <>
      {offers.map((offer: OfferShort): React.JSX.Element => <PlaceCard offer={offer} key={offer.id} />)}
    </>
  );
}
