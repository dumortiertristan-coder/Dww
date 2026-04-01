

/* 
   fetch() permet de chercher un fichier depuis le navigateur
   l'IA m'a expliqué comment l'utiliser car je savais pas qu'on pouvait
   lire un fichier JSON directement comme ça depuis JS
*/
fetch("trail_events_dataset_loremflickr.json")
    .then(function(response) {
        return response.json(); /* on convertit la réponse en vrai objet JS */
    })
    .then(function(trails) {
        /* trails c'est maintenant notre tableau de trails venu du JSON */
        creerLesCards(trails);
    });


function creerLesCards(trails) {

    var grille = document.getElementById("grille");

    /* on boucle sur chaque trail du JSON */
    for (var i = 0; i < trails.length; i++) {

        var trail = trails[i];
        var idCard = "card" + i; /* ex: card0, card1, card2 ... */

        /* le prix le plus bas parmi les courses du trail
           l'IA m'a aidé pour Math.min, je savais pas que ça existait */
        var prixMin = Math.min(...trail.races.map(function(r) { return r.price; }));

        /* --- créer la card bouton --- */
        /* même structure que ce qu'on avait écrit à la main avec le prof */
        var card = document.createElement("button");
        card.className = "card";
        card.setAttribute("popovertarget", idCard);
        card.setAttribute("popovertargetaction", "show");

        card.innerHTML = 
            '<img src="' + trail.images[0] + '" alt="trail">' +
            '<h2>' + trail.event_name + '</h2>' +
            '<p><i data-lucide="calendar"></i> ' + trail.date + '</p>' +
            '<p><i data-lucide="map-pin"></i> ' + trail.city + '</p>' +
            '<p class="prix">À partir de ' + prixMin + ',00 €</p>';

        grille.appendChild(card);

        /* --- créer le popover associé --- */
        /* même structure que les 3 colonnes col qu'on avait fait avec le prof */
        var popover = document.createElement("div");
        popover.id = idCard;
        popover.setAttribute("popover", "");

        /* colonne 1 : titre + distances */
        /* on génère les radio buttons depuis les races du JSON */
        var radios = "";
        for (var j = 0; j < trail.races.length; j++) {
            var race = trail.races[j];
            var radioId = idCard + "-race" + j;
            radios +=
                '<input type="radio" id="' + radioId + '" name="' + idCard + '" value="' + race.distance + '"' + (j === 0 ? " checked" : "") + '/>' +
                '<label for="' + radioId + '"> ' + race.distance + ' km</label><br>';
        }

        popover.innerHTML =
            '<div class="col">' +
                '<button popovertarget="' + idCard + '" popovertargetaction="hide">retour</button>' +
                '<h2>' + trail.event_name + '</h2>' +
                '<div><p>selection distances</p>' + radios + '</div>' +
            '</div>' +
            '<div class="col">' +
                '<img src="' + trail.images[0] + '" alt="trail">' +
            '</div>' +
            '<div class="col">' +
                '<button>Valider la commande</button>' +
            '</div>';

        document.body.appendChild(popover);
    }

    /* relancer lucide pour les nouvelles icones qu'on vient de créer
       l'IA m'a dit qu'il faut le refaire après avoir modifié le HTML depuis JS */
    lucide.createIcons();
}
