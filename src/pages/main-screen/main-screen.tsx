import React, { useState } from 'react';

import { TCity, TCityPackType } from '../../types/city';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffer } from '../../utils/offers-utils';

import Header from '../../components/header/header';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/ map/map';
import LocationsList from '../../components/locations-list/locations-list';
import { updateCurrentCity, updateCityOffersList } from '../../store/action';
import { Helmet } from 'react-helmet-async';
import { TOffers } from '../../types/offers';
import { PlacesListWrapperClassName } from '../../const/const';

type MainScreenProps = {
  cityPack: TCityPackType;
}

export default function MainScreen({cityPack}: MainScreenProps): React.JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('');
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);
  const cityOffers = useAppSelector((state) => state.cityOffers);
  const isLoading = useAppSelector((state) => state.isLoading);

  const hoveredCardOffer = getOffer(cityOffers, activeOfferId);
  const selectedPoints: TOffers = hoveredCardOffer ? [hoveredCardOffer] : [];

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

  const handleCityChange = (newCity: TCity) => {
    if (newCity.name === currentCity.name) {
      return;
    }

    dispatch(updateCurrentCity(newCity));
    dispatch(updateCityOffersList());
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cityPack={cityPack} currentCity={currentCity} onCityChange={handleCityChange}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
              <PlacesSorting />
              <PlacesList
                offers={cityOffers}
                className={PlacesListWrapperClassName.Main}
                isLoading={isLoading}
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseLeave={handleCardMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} points={cityOffers} selectedPoints={selectedPoints}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
