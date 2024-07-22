import React from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { TCity, TCityPackType } from '../../types/city';
import { updateCurrentCity, updateCityOffersList } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import CitiesSection from '../../components/cities-section/cities-section';

type MainScreenProps = {
  cityPack: TCityPackType;
}

export default function MainScreen({cityPack}: MainScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);
  const cityOffers = useAppSelector((state) => state.cityOffers);
  const isLoading = useAppSelector((state) => state.isLoading);

  const isNoOffers = !isLoading && !cityOffers.length;

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
      <main
        className={classNames(
          'page__main page__main--index',
          {'page__main--index-empty': isNoOffers}
        )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cityPack={cityPack} currentCity={currentCity} onCityChange={handleCityChange}/>
          </section>
        </div>
        <CitiesSection currentCity={currentCity} />
      </main>
    </div>
  );
}
