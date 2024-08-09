import React from 'react';
import { TShortOffers } from '../../../types/offers';
import { TPlaceCardMode } from '../../../types/common';
import { PlaceCardMode } from '../../../const/mode';
import PlaceCard from './place-card/place-card';
import Spinner from '../spinner/spinner';

type PlacesListProps = {
  offers: TShortOffers;
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

  return (
    <div className={className} data-testid='places list container'>
      {isLoading && <Spinner description='Ищем лучшие варианты'></Spinner>}
      {offers.map((offer): React.JSX.Element => (
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
