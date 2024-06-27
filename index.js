import { ajouterListenerAvis } from "./avis.js";
// Fonction qui génère toute la page web
export function genererPieces(pieces){
    for(let i=0; i < pieces.length; i++){

        const sectionFiches = document.querySelector(".fiches");

        const article = pieces[i];
        //Création de la balise article
        const pieceElement = document.createElement("article");
        //Création de la balise image que je lie à l'attribu src
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
        //Création de la balise h2 que je lie au nom de la piece
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        //Création de la balise p que je lie au prix de la piece automobile
        const prixElement = document.createElement("p");
        prixElement.innerText = `prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        //Création de la balise p que je lie au categorie de la piece automobile
        const categorieElement = document.createElement("p");
        categorieElement.innerText =article.categorie  ?? "(Aucune catégorie)";
        //Création de la balise p que je lie au description de la piece automobile
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "(Pas de description)";
        //Création de la balise p que je lie à la disponibilité de la piece automobile
        const disponibleElement = document.createElement("p"); 
        disponibleElement.innerText =`${article.disponible ? "En stock" : "Rupture de stock"}`;
        // On crée une balise bouton
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        // On rattache la balise artice à la section fiches du DOM
        sectionFiches.appendChild(pieceElement);
        
        // / On rattache les différentes balises à la balise artice 
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibleElement);
        pieceElement.appendChild(avisBouton);
        
        };
        // Ajout de la fonction (appel) ajouterListernerAvis qui déclanche l'évènement avis des utilisateurs
        ajouterListenerAvis();
};