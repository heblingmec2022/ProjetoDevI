import React from "react";
import Table from "./components/Table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/table">
          <Table />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
