import { Navigate, useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/shared/places-list/places-list';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, PlacesListWrapperClassName, SHOWED_NEARBY_OFFERS_AMOUNT } from '../../const/const';
import Spinner from '../../components/shared/spinner/spinner';
import { getRandomArrayItems } from '../../utils/utils';
import { fetchOfferScreenInfo } from '../../store/api-action';
import { useEffect } from 'react';

export default function OfferScreen(): React.JSX.Element {
  const params = useParams();
  const currentOfferId = params.id;
  const dispatch = useAppDispatch();
  const offers = useAppSelector((store) => store.offers);
  const currentOffer = useAppSelector((store) => store.currentOffer);
  const reviews = useAppSelector((store) => store.currentOfferReviews);
  const nearbyOffers = useAppSelector((store) => store.nearbyOffers);
  const showedNearbyOffers = getRandomArrayItems(nearbyOffers, SHOWED_NEARBY_OFFERS_AMOUNT);

  useEffect(() => {
    if (currentOfferId) {
      dispatch(fetchOfferScreenInfo({offerId: currentOfferId}));
    }
  }, [currentOfferId, dispatch]);

  if (!currentOfferId) {
    return <Navigate to={AppRoute.Page404} />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        {currentOffer
          ? (
            <PlaceOffer
              offers={offers}
              currentOffer={currentOffer}
              nearbyOffers={showedNearbyOffers}
              reviews={reviews}
            />
          )
          : <Spinner description='Загружаем информацию о предложении'/>}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={showedNearbyOffers}
              className={PlacesListWrapperClassName.Offer}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
