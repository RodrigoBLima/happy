import express from "express";

import './database/connection'

const app = express();

app.use(express.json())

app.get("/orphanages", (request, response) => {

});

app.post("/orphanages", (request, response) => {
    
});

app.listen(3333);
