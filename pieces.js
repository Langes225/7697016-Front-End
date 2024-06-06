// Récupération des piéces à partir du fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//je détermine où sera afficher mes articles dans la page HTML
const sectionFiches = document.querySelector(".fiches");

//je défini ma pièce
const article = pieces[0];
//je donne les caractéristiques de ma pièce par la création des différentes balises
const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `prix: ${article.prix} €`;

const categorieElement = document.createElement("p");
categorieElement.innerText =article.categorie  ?? "(Aucune catégorie)";

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "(Pas de description)";

const disponibleElement = document.createElement("p");
disponibleElement.innerText =`${article.disponible= true ? "En stock" : "Rupture de stock"}`;

// Affichage dans la pièce dans la section de la page HTML

sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibleElement);

