import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import AdminRoutes from "./components/Adminlayouts/Routes";
import FrontRoutes from "./components/Frontlayouts/Routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FrontRoutes} />
        <Route component={AdminRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
