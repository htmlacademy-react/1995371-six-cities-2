import React, { useState } from 'react';

import { Offers } from '../../types/offers';
import { CityPackType } from '../../types/city';

import { DEFAULT_CITY } from '../../mocks/city';
import { getOffer } from '../../utils/offers-utils';

import Header from '../../components/header/header';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/ map/map';
import LocationsList from '../../components/locations-list/locations-list';

type MainScreenProps = {
  offers: Offers;
  cityPack: CityPackType;
}

export default function MainScreen({offers, cityPack}: MainScreenProps): React.JSX.Element {
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [activeOfferId, setActiveOfferId] = useState('');

  const handleCardMouseEnter = (newId: string) => {
    if (newId === activeOfferId) {
      return;
    }

    setActiveOfferId(newId);
  };

  const handleCardMouseLeave = (newId?: string) => {
    if (newId === activeOfferId) {
      return;
    }

    setActiveOfferId(newId ? newId : '');
  };

  return (
    <div className="page page--gray page--main">
      <Header offers={offers}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cityPack={cityPack} currentCity={currentCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <PlacesSorting />
              <div className="cities__places-list places__list tabs__content">
                <PlacesList offers={offers} onCardMouseEnter={handleCardMouseEnter} onCardMouseLeave={handleCardMouseLeave} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} points={offers} selectedPoint={getOffer(offers, activeOfferId)}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
