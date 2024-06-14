// Creation d'une fonction d'écoute d'évènement sur le bouton avis pour chaque pièce automobile
export function ajouterListenerAvis(){
    const piecesElements = document.querySelectorAll(".fiches article button");

    for(let i=0; i<piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function (even) {
            const id = even.target.dataset.id;
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
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