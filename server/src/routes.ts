
import {Router} from 'express'

import { getRepository } from "typeorm";
import Orphanage from "./models/Orphanage";

const routes = Router()

routes.get("/orphanages", (request, response) => {});

routes.post("/orphanages", async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const orphanageRepository = getRepository(Orphanage);

  const orphanage = orphanageRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  await orphanageRepository.save(orphanage);

  return response.status(201).json(orphanage);

});

export default  routes