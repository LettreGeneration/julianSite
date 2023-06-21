import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import { createContext, useState } from "react";
import React from 'react';
import Home from './pages/accueil';
import Projet from './pages/projet';
import Categorie from './pages/categorie';
import DetailProjet from './pages/detailProjet';
import Julian from './pages/julian';

export const firstLoginContext = createContext(null);
export const setFirstLoginContext = createContext(null);

function App() {
  const [firstLogin, setFirstLogin] = useState(true);
  return (
    <firstLoginContext.Provider value={firstLogin}>
      <setFirstLoginContext.Provider value={setFirstLogin}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<Projet />} />
            <Route path="/projets/:categoryName" element={<Categorie />} />
            <Route path="/aboutMe" element={<Julian />} />
            <Route path="/projets/:categoryName/:detail" element={<DetailProjet />} />
          </Routes>
        </Router>
      </setFirstLoginContext.Provider>
    </firstLoginContext.Provider>
  );
}

export default App;
