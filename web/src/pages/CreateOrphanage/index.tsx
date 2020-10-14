import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";

import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/mapIcon";

import api from "../../services/api";

import "../../styles/pages/create-orphanage.css";

export default function CreateOrphanage() {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState();
  const [instructions, setInstructions] = useState();
  const [opening_hours, setOpeningHours] = useState();
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  // const [images, setImages] = useState([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setCenter({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = center;

    const data = {
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      latitude,
      longitude,
    };

  }
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {center.latitude && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[center.latitude, center.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                name="about"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button type="button" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                name="instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                name="opening_hours"
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
