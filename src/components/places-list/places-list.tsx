import React from 'react';
import { useState } from 'react';

import { Offers, OfferShort } from '../../types/offers';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offers;
}

export default function PlacesList({offers}: PlacesListProps): React.JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState({id: ''});

  const handleCardMouseOver = (newId: string): void => setActiveOfferId({id: newId});

  return (
    <>
      {offers.map((offer: OfferShort): React.JSX.Element => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseOver={handleCardMouseOver}
        />
      ))}
    </>
  );
}
