import { Navigate, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, PlacesListWrapperClassName, SHOWED_NEARBY_OFFERS_AMOUNT } from '../../const/const';
import { getRandomArrayItems } from '../../utils/utils';
import { fetchOfferScreenInfoAction } from '../../store/api-action';
import { useEffect } from 'react';
import { getCurrentOffer, getIsNoCurrentOffer, getNearbyOffers, getOffers } from '../../store/data-process/data-process.selectors';
import { clearOfferScreenInfo } from '../../store/data-process/data-process.slice';
import { redirectToRoute } from '../../store/action';
import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/shared/places-list/places-list';
import Spinner from '../../components/shared/spinner/spinner';

export default function OfferScreen(): React.JSX.Element {
  const params = useParams();
  const currentOfferId = params.id;
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isNoCurrentOffer = useAppSelector(getIsNoCurrentOffer);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && currentOfferId) {
      dispatch(fetchOfferScreenInfoAction({offerId: currentOfferId}));
    }

    return () => {
      dispatch(clearOfferScreenInfo());
      isMounted = false;
    };

  }, [currentOfferId, dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && isNoCurrentOffer) {
      dispatch(redirectToRoute({route: AppRoute.Page404}));
    }

    return () => {
      isMounted = false;
    };
  }, [isNoCurrentOffer, dispatch]);

  if (!currentOfferId) {
    return <Navigate to={AppRoute.Page404} />;
  }

  const showedNearbyOffers = getRandomArrayItems(nearbyOffers, SHOWED_NEARBY_OFFERS_AMOUNT);
  const isNearbyOffers = !!nearbyOffers.length;

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer" data-testid='offerScreen main element'>
        {currentOffer
          ? (
            <PlaceOffer
              offers={offers}
              currentOffer={currentOffer}
              nearbyOffers={showedNearbyOffers}
            />
          )
          : <Spinner description='Загружаем информацию о предложении'/>}
        {isNearbyOffers && (
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlacesList
                offers={showedNearbyOffers}
                className={PlacesListWrapperClassName.Offer}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
