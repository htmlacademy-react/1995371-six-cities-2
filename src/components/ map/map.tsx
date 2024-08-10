import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { TCity } from '../../types/city';
import { TPoints } from '../../types/map';
import useMap from '../../hooks/use-map';


type MapProps = {
  city: TCity;
  points: TPoints;
  selectedPoints?: TPoints;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

export default function Map({
  city,
  points,
  selectedPoints
}: MapProps): React.JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoints && selectedPoints.some((selectedPoint) => selectedPoint.id === point.id)
              ? currentCustomIcon
              : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
        isMounted = false;
      };
    }

    return () => {
      isMounted = false;
    };
  }, [map, city, points, selectedPoints]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
