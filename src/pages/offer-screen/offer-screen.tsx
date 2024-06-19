import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Offers } from '../../types/offers';
import { ReviewsPack } from '../../types/reviews';
import { getOffer } from '../../utils/offers-utils';

import Error404Screen from '../error-404-screen/error-404-screen';
import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/places-list/places-list';

type OfferScreenProps = {
  offers: Offers;
  reviewsPack: ReviewsPack;
}

export default function OfferScreen({
  offers,
  reviewsPack
}: OfferScreenProps): React.JSX.Element {
  const params = useParams();
  const [hoveredCardOfferID, setHoveredCardOfferID] = useState<string>('');

  const currentOfferId = params.id;
  const currentOffer = getOffer(offers, currentOfferId);

  if (!currentOfferId || !currentOffer) {
    return <Error404Screen />;
  }

  const nearbyOffers = offers.filter((offer) => offer.id !== currentOfferId);
  const hoveredCardOffer = getOffer(offers, hoveredCardOfferID);
  const reviews = reviewsPack[currentOfferId];

  const handleCardMouseEnter = (newId: string) => {
    if (newId === hoveredCardOfferID) {
      return;
    }

    setHoveredCardOfferID(newId);
  };

  const handleCardMouseLeave = (newId?: string) => {
    if (newId === hoveredCardOfferID) {
      return;
    }

    setHoveredCardOfferID(newId ? newId : '');
  };

  return (
    <div className="page">
      <Header offers={offers}/>
      <main className="page__main page__main--offer">
        <PlaceOffer
          currentOffer={currentOffer}
          nearbyOffers={nearbyOffers}
          hoveredCardOffer={hoveredCardOffer}
          reviews={reviews}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                offers={nearbyOffers}
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseLeave={handleCardMouseLeave}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
