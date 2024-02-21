import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LeafletMap = ({ startDestination, endDestination }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([42.6539325493892, 21.143177351933], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      mapRef.current = map;
    }

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    if (startDestination && startDestination.latitude && startDestination.longitude) {
      L.marker([startDestination.latitude, startDestination.longitude]).addTo(mapRef.current);
    }

    if (endDestination && endDestination.latitude && endDestination.longitude) {
      L.marker([endDestination.latitude, endDestination.longitude]).addTo(mapRef.current);
    }
    
  }, [startDestination, endDestination]);

  return <div id="map" style={{ height: '400px'}} />;
};

export default LeafletMap;
