import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getOffer } from '../../utils/offers-utils';

import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/places-list/places-list';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { AppRoute, SHOWED_NEARBY_OFFERS_AMOUNT } from '../../const/const';
import Spinner from '../../components/shared/spinner/spinner';
import { getRandomArrayItems } from '../../utils/utils';
import { TOffers } from '../../types/offers';

export default function OfferScreen(): React.JSX.Element {
  const params = useParams();
  const [hoveredCardOfferID, setHoveredCardOfferID] = useState<string>('');
  const [showedNearbyOffers, setShowedNearbyOffers] = useState<TOffers>([]);
  const currentOfferId = params.id;
  const offers = useAppSelector((store) => store.offers);
  const currentOffer = useAppSelector((store) => store.currentOffer);
  const reviews = useAppSelector((store) => store.currentOfferReviews);
  const nearbyOffers = useAppSelector((store) => store.nearbyOffers);

  useEffect(() => {
    setShowedNearbyOffers(getRandomArrayItems(nearbyOffers, SHOWED_NEARBY_OFFERS_AMOUNT));
  }, [nearbyOffers]);

  if (!currentOfferId || !currentOffer) {
    return <Navigate to={AppRoute.Page404} />;
  }

  const hoveredCardOffer = getOffer(offers, hoveredCardOfferID);

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
      <Helmet>
        <title>Six cities. Offer</title>
      </Helmet>
      <Header offers={offers}/>
      <main className="page__main page__main--offer">
        {currentOffer
          ? (
            <PlaceOffer
              currentOffer={currentOffer}
              nearbyOffers={showedNearbyOffers}
              hoveredCardOffer={hoveredCardOffer}
              reviews={reviews}
            />
          )
          : <Spinner description='Загружаем информацию о предложении'/>}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                offers={showedNearbyOffers}
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
