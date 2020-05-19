import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminRoutes from "./components/Admin/Routes";
import FrontRoutes from "./components/Front/Routes";

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
