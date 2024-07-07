import React from 'react';

import { Offers } from '../../types/offers';
import { PlaceCardMode } from '../../types/common';

import { PlaceCardModeOption } from '../../const/mode';
import { getFavoriteOffers } from '../../utils/filter-utils';
import PlaceCard from './place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  cardMode?: PlaceCardMode;
  onCardMouseEnter?: (newId: string) => void;
  onCardMouseLeave?: (newId?: string) => void;
}

export default function PlacesList({
  offers,
  cardMode = PlaceCardModeOption.Default,
  onCardMouseEnter,
  onCardMouseLeave
}: PlacesListProps): React.JSX.Element {
  const isFavorite: boolean = cardMode === PlaceCardModeOption.Favorite;

  const handleMouseEnterEvent = (newId: string): void => {
    if (onCardMouseEnter) {
      onCardMouseEnter(newId);
    }
  };

  const handleMouseLeaveEvent = (newId?: string): void => {
    if (onCardMouseLeave) {
      onCardMouseLeave(newId);
    }
  };

  const filteredOffers = isFavorite ? getFavoriteOffers(offers) : offers;

  return (
    <>
      {filteredOffers.map((offer): React.JSX.Element => (
        <PlaceCard
          offer={offer}
          cardMode={cardMode}
          onMouseEnter={handleMouseEnterEvent}
          onMouseLeave={handleMouseLeaveEvent}
          key={offer.id}
        />
      ))}
    </>
  );
}
