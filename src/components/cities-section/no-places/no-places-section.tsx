type NoPlacesSectionProps = {
  cityTitle: string;
}

export default function NoPlacesSection({cityTitle}: NoPlacesSectionProps): React.JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {cityTitle}</p>
      </div>
    </section>
  );
}
