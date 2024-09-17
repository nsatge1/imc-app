const express = require('express');
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Définir le schéma pour l'enregistrement des personnes et leur IMC
const PersonSchema = new mongoose.Schema({
    nom: String,
    poids: Number,
    taille: Number,
    imc: Number
});

// Créer un modèle basé sur ce schéma
const Person = mongoose.model('Person', PersonSchema);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur!');
});

// Route pour calculer et enregistrer l'IMC
app.post('/calculate', async (req, res) => {
    try {
        const { nom, poids, taille } = req.body;
        const imc = poids / ((taille/100) ** 2);

        // Enregistrer dans la base de données
        const person = new Person({ nom, poids, taille, imc });
        await person.save();

        res.json({ imc });
    } catch (error) {
        res.status(500).send('Erreur lors de l\'enregistrement');
    }
});

// Route pour obtenir les IMC enregistrés
app.get('/fetch', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Route pour obtenir une personne par son nom
app.get('/fetch/:nom', async (req, res) => {
    try {
        const person = await Person.findOne({ nom: req.params.nom });
        if (!person) {
            return res.status(404).send('Personne non trouvée');
        }
        res.json(person);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Route par défaut
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrer le serveur sur le port 3001
app.listen(3001, () => {
    console.log('Server running on port 3001');
});