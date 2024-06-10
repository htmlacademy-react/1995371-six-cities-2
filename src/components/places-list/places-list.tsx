import React from 'react';
import { useState } from 'react';

import { Offers, OfferShort } from '../../types/offers';
import { PlaceCardMode } from '../../types/common';

import { PlaceCardModeOption } from '../../const';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  cardMode?: PlaceCardMode;
}

export default function PlacesList({offers, cardMode = PlaceCardModeOption.Default}: PlacesListProps): React.JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState({id: ''});

  const handleCardMouseOver = (newId: string): void => setActiveOfferId({id: newId});
  let cardsList: React.JSX.Element[] = [];

  switch (cardMode) {
    case PlaceCardModeOption.Favorite:
      cardsList = offers
        .filter((offer: OfferShort) => offer.isFavorite)
        .map((offer: OfferShort): React.JSX.Element => (
          <PlaceCard
            offer={offer}
            cardMode={cardMode}
            onMouseOver={handleCardMouseOver}
            key={offer.id}
          />
        ));
      break;
    case PlaceCardModeOption.Default:
      cardsList = offers.map((offer: OfferShort): React.JSX.Element => (
        <PlaceCard
          offer={offer}
          cardMode={cardMode}
          onMouseOver={handleCardMouseOver}
          key={offer.id}
        />
      ));
      break;
  }

  return (
    <>
      {cardsList}
      <p></p>
    </>
  );
}
