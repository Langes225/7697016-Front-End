// Récupération des piéces à partir du fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for(let i=0; i < pieces.length; i++){
//je détermine où sera afficher mes articles dans le DOM
const sectionFiches = document.querySelector(".fiches");
//Définition d'un article
const article = pieces[i]

//Création des balises
const pieceElement = document.createElement("article");
//je donne les caractéristiques de ma pièce par la création des différentes balises
const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText =article.categorie  ?? "(Aucune catégorie)";

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "(Pas de description)";

const disponibleElement = document.createElement("p"); 
disponibleElement.innerText =`${article.disponible ? "En stock" : "Rupture de stock"}`;

// Affichage dans la pièce dans la section de la page HTML
sectionFiches.appendChild(pieceElement);
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(disponibleElement);
};
// Gestion des boutons 
// Récupération des boutons trier
const btnTrier = document.querySelector(".btn-trier");

const btnTrierDecrossaint = document.querySelector(".btn-trier-decroissant");

// Récupération des boutons filtre
const btnFiltrer = document.querySelector(".btn-filtrer");

const btnFiltreDescription = document.querySelector(".btn-filtrer-description");


// Ecoute de l'événement click sur les bouton trier
btnTrier.addEventListener("click", () =>{
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function(a, b){
        return a.prix - b.prix;
    });
    console.log(piecesOrdonees);

});

btnTrierDecrossaint.addEventListener("click", () =>{
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function(a, b){
        return b.prix - a.prix;
    });
    console.log(piecesOrdonees)
});



// Ecoute de l'évènement click sur les boutons filtre
btnFiltrer.addEventListener("click", () =>{
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

btnFiltreDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description = true;
    });
    console.log(piecesFiltrees);
});
