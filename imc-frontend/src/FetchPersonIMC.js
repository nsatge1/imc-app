import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

function FetchPersonIMC() {
    const [nom, setNom] = useState('');
    const [person, setPerson] = useState(null);
    const [categorie, setCategorie] = useState('');
    const [couleur, setCouleur] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://imc-backend.onrender.com/fetch/${nom}`);
            const personData = response.data;
            setPerson(personData);

            const { categorie, couleur } = getCategorie(personData.imc);
            setCategorie(categorie);
            setCouleur(couleur);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    };

    // Fonction pour déterminer la catégorie en fonction de l'IMC
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

    return (
        <div>
            <h1>Recherche IMC d'une personne</h1>
            <div className="center-container">
            <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom complet (Prenom Nom)"
            />
            <button onClick={handleSearch}>Rechercher</button>
            </div>
            {person && (
                <div>
                    <p>Nom: {person.nom}</p>
                    <p>IMC: {person.imc}</p>
                    <p style={{ color: couleur }}>Catégorie: {categorie}</p>
                </div>
            )}
        </div>
    );
}

export default FetchPersonIMC;