import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CalculateIMC from './CalculateIMC';
import FetchPersonIMC from './FetchPersonIMC';
import FetchAllPeople from './FetchAllPeople';
import './App.css'; // Assure-toi que le chemin est correct

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Calculateur IMC</h1>
                <nav>
                    <Link to="/">Calculer IMC</Link> | 
                    <Link to="/fetch-person">IMC d'une personne</Link> | 
                    <Link to="/fetch-all">Voir toutes les personnes</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<CalculateIMC />} />
                    <Route path="/fetch-person" element={<FetchPersonIMC />} />
                    <Route path="/fetch-all" element={<FetchAllPeople />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;