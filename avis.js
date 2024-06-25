// Creation d'une fonction d'écoute d'évènement sur le bouton avis pour chaque pièce automobile
export function ajouterListenerAvis(){
    const piecesElements = document.querySelectorAll(".fiches article button");

    for(let i=0; i<piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function (even) {
            const id = even.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            const pieceElement = even.target.parentElement;

            const avisElement = document.createElement("p")
            for(let l=0; l<avis.length; l++){
                avisElement.innerHTML += `<br>${avis[l].utilisateur}:<br>${avis[l].commentaire}<br>`;
            }
            pieceElement.appendChild(avisElement);
        })
    }
}

// Création d'une fonction listener ajouter un avis sur une pièce automobile
export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", (even)=>{
        even.preventDefault();
    // Création de l'objet du nouvel avis
    const avis = {
        pieceId: parseInt(even.target.querySelector("[name=piece-id]").value),
        utilisateur: even.target.querySelector("[name=utilisateur]").value,
        commentaire: even.target.querySelector("[name=commentaire]").value,
        nbEtoile: even.target.querySelector("[name=nombre-etoile]").value
        };
        // Création de la charge utile
        const chargeUtile = JSON.stringify(avis);
        // Appel de la fonction fetch avec toutes les information neccessaires
        fetch("http://localhost:8081/avis",{
        method: "POST",
        headers: "application/json",
        body: chargeUtile
        });

    });
}