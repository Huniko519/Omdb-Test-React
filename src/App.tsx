import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TutorialsList from "./components/Main";

function App() {
  return (
    <div className="container mt-3">
      <Switch>
        <Route path="/" component={TutorialsList} />
      </Switch>
    </div>
  );
}

export default App;
