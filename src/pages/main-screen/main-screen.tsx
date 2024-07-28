import React from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { TCityPackType } from '../../types/city';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import CitiesSection from '../../components/cities-section/cities-section';
import { getIsCityOffers, getIsLoading } from '../../store/data-process/data-process.selectors';

type MainScreenProps = {
  cityPack: TCityPackType;
}

export default function MainScreen({cityPack}: MainScreenProps): React.JSX.Element {

  const isCityOffers = useAppSelector(getIsCityOffers);
  const isLoading = useAppSelector(getIsLoading);
  const isNoOffers = !isLoading && !isCityOffers;

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
            <LocationsList cityPack={cityPack} />
          </section>
        </div>
        <CitiesSection />
      </main>
    </div>
  );
}
