import { useParams } from 'react-router-dom';

import { Offers } from '../../types/offers';

import Header from '../../components/header/header';
import PlaceOffer from '../../components/place-offer/place-offer';
import PlacesList from '../../components/places-list/places-list';

type OfferScreenProps = {
  offers: Offers;
}

export default function OfferScreen({offers}: OfferScreenProps): React.JSX.Element {
  const params = useParams();
  const currentOfferId = params.id as string;

  const similaPlaces = offers.filter((offer) => offer.id !== currentOfferId);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <PlaceOffer offers={offers} currentOfferId={currentOfferId}/>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={similaPlaces} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
