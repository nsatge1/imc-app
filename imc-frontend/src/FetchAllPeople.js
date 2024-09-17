import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchAllPeople() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fetch');
                setPeople(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Toutes les personnes enregistrées</h2>
            <ul>
                {people.map(person => (
                    <li key={person._id}>{person.nom}: {person.imc}</li>
                ))}
            </ul>
        </div>
    );
}

export default FetchAllPeople;