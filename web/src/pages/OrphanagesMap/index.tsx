import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import mapMarkerImg from "../../images/map-marker.svg";
import mapIcon from "../../utils/mapIcon";

import api from "../../services/api";

import "../../styles/pages/orphanages-map.css";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanegesMap() {
  const [orphaneges, setOrphaneges] = useState<Orphanage[]>([]);
  // const [state, setstate] = useState(initialState)

  useEffect(() => {
    api.get("orphanages").then((response) => {
      let data = response.data;

      setOrphaneges(data);
    });
  }, []);

  return (
    <>
      <div id="page-map">
        <aside>
          <header>
            <img src={mapMarkerImg} alt="mapMarker" />

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

          {orphaneges.map((orphanege) => {
            return (
              <Marker
                key={orphanege.id}
                position={[orphanege.latitude, orphanege.longitude]}
                icon={mapIcon}
              >
                <Popup
                  closeButton={false}
                  maxWidth={240}
                  className="map-poupup"
                >
                  {orphanege.name}
                  <Link to={`/orphanages/${orphanege.id}`}>
                    <FiArrowRight size={32} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </Map>
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </>
  );
}
export default OrphanegesMap;
