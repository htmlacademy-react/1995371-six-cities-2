import React from 'react';

import { TOffers } from '../../types/offers';
import { TPlaceCardMode } from '../../types/common';

import { PlaceCardMode } from '../../const/mode';
import { getFavoriteOffers } from '../../utils/filter-utils';
import PlaceCard from './place-card/place-card';
import Spinner from '../shared/spinner/spinner';

type PlacesListProps = {
  offers: TOffers;
  className: string;
  isLoading?: boolean;
  cardMode?: TPlaceCardMode;
  onCardMouseEnter?: (newId: string) => void;
  onCardMouseLeave?: (newId?: string) => void;
}

export default function PlacesList({
  offers,
  className,
  isLoading,
  cardMode = PlaceCardMode.Default,
  onCardMouseEnter,
  onCardMouseLeave
}: PlacesListProps): React.JSX.Element {
  const isFavorite: boolean = cardMode === PlaceCardMode.Favorite;

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
    <div className={className}>
      {isLoading && <Spinner description='Ищем лучшие варианты'></Spinner>}
      {filteredOffers.map((offer): React.JSX.Element => (
        <PlaceCard
          offer={offer}
          cardMode={cardMode}
          onMouseEnter={handleMouseEnterEvent}
          onMouseLeave={handleMouseLeaveEvent}
          key={offer.id}
        />
      ))}
    </div>
  );
}
