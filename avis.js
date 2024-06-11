// Creation d'une fonction d'écoute d'évènement sur le bouton avis pour chaque pièce automobile
export function ajouterListenerAvis(){
    const piecesElements = document.querySelectorAll(".fiches article button");

    for(let i=0; i<piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function (even) {
            const id = even.target.dataset.id;
            fetch(`http://localhost:8081/pieces/${id}/avis`);
        })
    }
}