import { useEffect, useRef } from 'react';
import './Map.scss';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const icon = L.icon({iconUrl: markerIconPng});

export default function Map() {
  const map = useRef(null)
  const {currentUser} = useContext(AuthContext)
  
  useEffect(()=>{
    map.current = L.map('map');

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map.current);

    map.current.setView([currentUser.address.geometry.coordinates[1],currentUser.address.geometry.coordinates[0]], 30)
    L.marker([currentUser.address.geometry.coordinates[1],currentUser.address.geometry.coordinates[0]],{icon}).addTo(map.current);
    
    return () => map.current.remove();
  },[currentUser])


  return (
    <div id="map"></div>
  );
}
