import React from 'react';
import { useState } from 'react';

import { Offers } from '../../types/offers';
import { PlaceCardMode } from '../../types/common';

import { PlaceCardModeOption } from '../../const';
import { getFavoriteOffers } from '../../utils/filter-utils';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  cardMode?: PlaceCardMode;
}

export default function PlacesList({offers, cardMode = PlaceCardModeOption.Default}: PlacesListProps): React.JSX.Element {
  const isFavorite: boolean = cardMode === PlaceCardModeOption.Favorite;
  const [activeOfferId, setActiveOfferId] = useState({id: ''});

  const handleCardMouseOver = (newId: string): void => setActiveOfferId({id: newId});
  const filteredOffers = isFavorite ? getFavoriteOffers(offers) : offers;

  return (
    <>
      {filteredOffers.map((offer): React.JSX.Element => (
        <PlaceCard
          offer={offer}
          cardMode={cardMode}
          onMouseOver={handleCardMouseOver}
          key={offer.id}
        />
      ))}
    </>
  );
}
