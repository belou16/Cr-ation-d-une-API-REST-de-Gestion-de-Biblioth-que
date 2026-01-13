const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// Données fictives (Simule une base de données)
let livres = [
    {id: 1, titre : "Yvain ou Le Chevalier au lion", auteur : "Chrétien de Troyes", annee :"2024"},
    {id: 2, titre : "La femme de ménage", auteur : "Freida McFadden", annee :"2025"},
    {id: 3, titre : "Les belles promesses", auteur : "Pierre Lemaitre", annee :"2026"}
];

// --- LES ROUTES ---

// 1. GET : Récupérer tous les livres
app.get('/livres', (_req, res) => {
    res.json(livres);
});

// 2. POST : Ajouter ajouter un livre
app.post('/livres', (req, res) => {
    const newLivres = {
        id: livres.length + 1,
        titre: req.body.titre,
        auteur: req.body.auteur,
        annee: req.body.annee
    };
    livres.push(newLivres);
    res.status(201).json(newLivres);
});

// 3. PUT : Modification d'un livre route : put /livres/:id
app.put('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livre = livres.find(livre => livre.id === id);
    if (livre) {
        livre.titre = req.body.titre || livre.titre;
        livre.auteur = req.body.auteur || livre.auteur;
        livre.annee = req.body.annee || livre.annee;
        res.json(livre);
    } else {
        res.status(404).send({ message: "Livre non trouvé" });
    }   
}); 


// 3. DELETE : Supprimer un utilisateur par ID
app.delete('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livres.findIndex(livre => livre.id === id);
    if (index !== -1) {
        const deletedLivre = livres.splice(index, 1);
        res.json(deletedLivre[0]);
    } else {
        res.status(404).send({ message: "Livre non trouvé" });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});