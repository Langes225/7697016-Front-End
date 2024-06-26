import { genererPieces } from "./script";

/**Gestion des boutons */
// Récupération des boutons trier
const btnTrier = document.querySelector(".btn-trier");

const btnTrierDecrossaint = document.querySelector(".btn-trier-decroissant");

// Récupération des boutons filtre
const btnFiltrer = document.querySelector(".btn-filtrer");

const btnFiltreDescription = document.querySelector(".btn-filtrer-description");


// Ecoute de l'événement click sur le bouton trier croissant
btnTrier.addEventListener("click", () =>{
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function(a, b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonees);

});

// Ecoute de l'événement click sur le bouton trier décroissant
btnTrierDecrossaint.addEventListener("click", () =>{
    const piecesDecrossants = Array.from(pieces);
    piecesDecrossants.sort(function(a, b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesDecrossants);
});

// Ecoute de l'évènement click sur le boutons filtre
btnFiltrer.addEventListener("click", () =>{
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});
// Ecoute de l'évènement click sur le boutons description
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