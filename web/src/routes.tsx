import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanegesMap from "./pages/OrphanagesMap";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        {/* {/* <Route path="/give-classes" component={TeacherForm}></Route> */}
        <Route path="/app" component={OrphanegesMap}></Route>
      </Switch>
    </BrowserRouter>
  );
}
