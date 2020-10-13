import React from "react";

import { Link } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import mapMarker from "../../images/map-marker.svg";

import '../../styles/pages/orphanages-map.css'

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
        <div></div>
        <Link to="" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </>
  );
}
export default OrphanegesMap;
