import { ajoutListenerEnvoyerAvis }  from "./avis.js";
import { ajouterListenerAvis } from "./avis.js";

let pieces = window.localStorage.setItem('pieces');
if (pieces === null){
    // Récupération des piéces dépuis  l’API à l’adresse http://localhost:8081/pieces.
    const reponse = await fetch('http://localhost:8081/pieces');
    const pieces = await reponse.json();
    // Transformation des pièces en json
    const valeurPieces = JSON.stringify(pieces);
    // stockage des informations des pièces automobiles dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}
// On appelle la fonction pour ajouter un listener au formulaire
ajoutListenerEnvoyerAvis();

// Fonction qui génère toute la page web
function genererPieces(pieces){
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

// Première affichage de la page
genererPieces(pieces);

/**Gestion des boutons dans le filtre */

// 'écoute de l'événement click sur le bouton trier croissant
const btnTrier = document.querySelector(".btn-trier");
btnTrier.addEventListener("click", () =>{
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function(a, b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonees);

});


// Création d'une fonction d'écoute de l'événement click sur le bouton trier décroissant

const btnTrierDecrossaint = document.querySelector(".btn-trier-decroissant");
btnTrierDecrossaint.addEventListener("click", () =>{
const piecesDecrossants = Array.from(pieces);
piecesDecrossants.sort(function(a, b){
    return b.prix - a.prix;
});
document.querySelector(".fiches").innerHTML = "";
genererPieces(piecesDecrossants);
});
// Création d'une fonction d'écoute de l'évènement click sur le boutons filtre

const btnFiltrer = document.querySelector(".btn-filtrer");
btnFiltrer.addEventListener("click", () =>{
const piecesFiltrees = pieces.filter(function(piece){
    return piece.prix <= 35;
});
document.querySelector(".fiches").innerHTML = "";
genererPieces(piecesFiltrees);
});

// Création d'une fonction d'écoute de l'évènement click sur le boutons description

const btnFiltreDescription = document.querySelector(".btn-filtrer-description");
btnFiltreDescription.addEventListener("click", () => {
const piecesDescription = pieces.filter(function(piece){
    return piece.description = true;
});
document.querySelector(".fiches").innerHTML = "";
genererPieces(piecesDescription)
});

// Gestion des pièces abordables
const pAbordables = document.querySelector(".abordables") 

// Définition d'une variable liste de nom des pièces
const listeNomsPieces = pieces.map(piece => piece.nom);
for(let i = listeNomsPieces -1; i >=0; i--){
    if(pieces[i].prix <= 35){
        listeNomsPieces.splice(i,1);
    };
};

// Affichage de la liste des pièces abordables dans le DOM
const abordablesElements = document.createElement("ul");

for(let i= 0; i < listeNomsPieces.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = listeNomsPieces[i];
    abordablesElements.appendChild(nomElement)
};

pAbordables.appendChild(abordablesElements);

// Gestion des pièces disponibles
const piecesDisponibles = document.querySelector(".disponibles")
const nomDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix);

for(let l = pieces.length-1 ; l >= 0; l--){
    if(pieces[l].disponible === false){
        nomDisponibles.splice(l,1);
        prixDisponibles.splice(l,1);
    };
};

// Liaison de la liste des pièces disponibles et leurs prix  dans le DOM
const dispoElements = document.createElement("ul");
for (let index = 0; index < nomDisponibles.length; index++) {
    const nomElement = document.createElement("li");
    nomElement.innerText =`${nomDisponibles[index]} - ${prixDisponibles[index]} €`;
    dispoElements.appendChild(nomElement);
}
const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Piéces disponibles :";
piecesDisponibles.appendChild(pElementDisponible).appendChild(dispoElements);

// Gestion de l'input
const inputPrixMax = document.querySelector("#prix-maximum");
// Ecoute de l'événement input 
inputPrixMax.addEventListener("input", () =>{
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
} )

const btnMaj = document.querySelector(".btn-maj");
btnMaj.addEventListener("click", () => {
    window.localStorage.removeItem("nom");
})