import { ajoutListenerEnvoyerAvis }  from "./avis.js";
import { genererPieces } from "./script.js";

// Récupération des piéces dépuis  l’API à l’adresse http://localhost:8081/pieces.
const reponse = await fetch('http://localhost:8081/pieces');
const pieces = await reponse.json();

// On appelle la fonction pour ajouter un listener au formulaire
ajoutListenerEnvoyerAvis();

// Transformation des pièces en JSON
const valeurPieces = JSON.stringify(pieces);
// Stockage des informations sur les pièces automobiles en local
window.localStorage.setItem("pieces", valeurPieces);

// Première affichage de la page
genererPieces(pieces);