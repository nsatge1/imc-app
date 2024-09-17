import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [nom, setNom] = useState('');
    const [poids, setPoids] = useState('');
    const [taille, setTaille] = useState('');
    const [imc, setImc] = useState(null);
    const [historique, setHistorique] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/calculate', { nom, poids, taille });
            setImc(response.data.imc);
            fetchHistorique();
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        }
    };
    
    const fetchHistorique = async () => {
        try {
            const response = await axios.get('http://localhost:3001/fetch');
            setHistorique(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchHistorique();
    }, []);

    return (
        <div className="App">
            <h1>Calculateur IMC</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label>
                    Nom:
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <label>
                    Poids (kg):
                    <input type="number" value={poids} onChange={(e) => setPoids(e.target.value)} />
                </label>
                <label>
                    Taille (m):
                    <input type="number" value={taille} onChange={(e) => setTaille(e.target.value)} />
                </label>
                <button type="submit">Calculer IMC</button>
            </form>
            {imc !== null && <p>IMC: {imc}</p>}
            <h2>Historique des IMC</h2>
            <ul>
                {historique.map(entry => (
                    <li key={entry.id}>{entry.nom}: {entry.imc}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
