import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Movies from "./components/Movies";
import FilmCard from "./components/FilmCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [film, setFilm] = useState();
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Movies
              setFilm={setFilm}
            />
          </Route>
          <Route path="/film:id" >
            <FilmCard
              film={film}
            />
          </Route>
        </Switch>

      </div>
    </Router >
  );
}

export default App;
