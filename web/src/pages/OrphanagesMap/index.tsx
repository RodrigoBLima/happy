import React from "react";

import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import Leaflet from "leaflet";

import mapMarker from "../../images/map-marker.svg";

import "../../styles/pages/orphanages-map.css";
import "leaflet/dist/leaflet.css";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [50, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function OrphanegesMap() {
  return (
    <>
      <div id="page-map">
        <aside>
          <header>
            <img src={mapMarker} alt="mapMarker" />

            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita.</p>
          </header>

          <footer>
            <strong>São Paulo</strong>
            <span>Itaquaquecetuba</span>
          </footer>
        </aside>
        <Map
          center={[-21.235374444444446, -47.409243333333336]}
          zoom={15}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[-21.235374444444446, -47.409243333333336]}
            icon={mapIcon}
          >
            <Popup closeButton={false} maxWidth={240} className="map-poupup">
              Nome orfanato
              <Link to="">
                <FiArrowRight size={32} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        </Map>
        <Link to="" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </>
  );
}
export default OrphanegesMap;
