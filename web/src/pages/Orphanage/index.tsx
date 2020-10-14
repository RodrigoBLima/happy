import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import { useParams } from "react-router-dom";

import api from "../../services/api";

import Sidebar from "../../components/Sidebar";

import mapIcon from "../../utils/mapIcon";

import "../../styles/pages/orphanage.css";

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    url: string;
    id: number;
  }>;
}

interface OrphanageParamns {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParamns>();

  const [orphanege, setOrphanege] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      let data = response.data;

      setOrphanege(data);
    });
  }, [params.id]);

  if (!orphanege) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanege.images[activeImageIndex].url}
            alt={orphanege.name}
          />

          <div className="images">
            {orphanege.images.map((image, index) => {
              return (
                <button
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  key={image.id}
                >
                  <img src={image.url} alt={orphanege.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanege.name}</h1>
            <p>{orphanege.about}</p>

            <div className="map-container">
              <Map
                center={[orphanege.latitude, orphanege.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanege.latitude, orphanege.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanege.latitude},${orphanege.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanege.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanege.opening_hours}
              </div>
              {orphanege.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#ff6690" />
                  Não atendemos
                  <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
