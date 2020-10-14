import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateOrphanage from "./pages/CreateOrphanage";

import Landing from "./pages/Landing";
import Orphanage from "./pages/Orphanage";
import OrphanegesMap from "./pages/OrphanagesMap";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/orphanages/create" component={CreateOrphanage}></Route>
        <Route path="/orphanages/:id" component={Orphanage}></Route>
        <Route path="/app" component={OrphanegesMap}></Route>
      </Switch>
    </BrowserRouter>
  );
}
