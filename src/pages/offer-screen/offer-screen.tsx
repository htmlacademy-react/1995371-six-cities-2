import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getOffer } from '../../utils/offers-utils';

import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/places-list/places-list';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const/const';
import { fetchCurrentOfferAction } from '../../store/api-action';
import Spinner from '../../components/shared/spinner/spinner';
import { loadCurrentOffer, loadCurrentOfferReviews } from '../../store/action';

export default function OfferScreen(): React.JSX.Element {
  const params = useParams();
  const [hoveredCardOfferID, setHoveredCardOfferID] = useState<string>('');
  const currentOfferId = params.id;
  const offers = useAppSelector((store) => store.offers);
  const currentOffer = useAppSelector((store) => store.currentOffer);
  const reviews = useAppSelector((store) => store.currentOfferReviews);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentOfferId) {
      return;
    }

    dispatch(fetchCurrentOfferAction({offerId: currentOfferId}));
    return () => {
      dispatch(loadCurrentOffer(null));
      dispatch(loadCurrentOfferReviews([]));
    };
  }, [currentOfferId, dispatch]);

  if (!currentOfferId) {
    return <Navigate to={AppRoute.Page404} />;
  }

  const nearbyOffers = offers.filter((offer) => offer.id !== currentOfferId);
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
              nearbyOffers={nearbyOffers}
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
