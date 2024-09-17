import React, { useState } from 'react';
import axios from 'axios';

function CalculateIMC() {
    const [nom, setNom] = useState('');
    const [poids, setPoids] = useState('');
    const [taille, setTaille] = useState('');
    const [imc, setImc] = useState(null);
    const [categorie, setCategorie] = useState('');
    const [couleur, setCouleur] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://imc-backend.onrender.com/calculate', { nom, poids, taille });
            const imcValue = response.data.imc;
            setImc(imcValue);

            const { categorie, couleur } = getCategorie(imcValue);
            setCategorie(categorie);
            setCouleur(couleur);
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label>
                    Nom complet (Prenom Nom):
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
            {imc !== null && (
                <div style={{ textAlign: 'center' }}>
                <p style={{ color: couleur }}>
                    IMC: {imc} - {categorie}
                </p>
            </div>
            )}
        </div>
    );
}

// La fonction getCategorie peut être définie ici ou importée
const getCategorie = (imc) => {
    if (imc < 18.5) {
        return { categorie: "Insuffisance pondérale", couleur: "#FF6347" }; // Tomate
    } else if (imc >= 18.5 && imc < 25) {
        return { categorie: "Poids normal", couleur: "#32CD32" }; // Lime
    } else if (imc >= 25 && imc < 30) {
        return { categorie: "Surpoids", couleur: "#FFD700" }; // Or
    } else {
        return { categorie: "Obésité", couleur: "#FF4500" }; // Orange Red
    }
};

export default CalculateIMC;