/* Funzione per popolare una riga di film */

function populateMovieRow(rowId, start, end) {
    const row = document.getElementById(rowId);
    for (let i = start; i <= end; i++) {
        const imagePath = `assets/imgs/movies/${i}.png`;
        const card = createMovieCard(imagePath, i, i === start);
        row.appendChild(card);
    }
}

/* Funzione per creare una card del film */
function createMovieCard(imagePath, i, isFirst) {
    const card = document.createElement('div');
    card.className = "item d-flex";
    if (isFirst) {                                              // Aggiungi la classe ms-2 al primo elemento
        card.classList.add("ms-2"); 
    }
    card.innerHTML = `<img class="rounded-3" id="img${i}" type="button" data-bs-toggle="modal" data-bs-target="#film${i}" src="${imagePath}" alt="Movie Thumbnail-${i}">`;
    return card;
}

/* Popolamento delle righe */
document.addEventListener("DOMContentLoaded", () => {
    populateMovieRow("carousel-1", 1, 6);
    populateMovieRow("carousel-2", 7, 12);
    populateMovieRow("carousel-3", 13, 18); 
}); 







/* funzione per poter scorrere le immagini quando si clicca su next o prev */

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per aggiornare il carosello in base all'id
    function updateCarousel(carouselId, direction) {
        const carousel = document.getElementById(carouselId);   // seleziona il carosello
        const items = carousel.querySelectorAll(".item");       // seleziona tutti gli elementi (.item) al suo interno
        const containerWidth = carousel.offsetWidth;            // calcola la lunghezza in px del carosello
        const style = window.getComputedStyle(items[0]);        // ottiene lo stile computato dell'elemento (width+gap+margin...)   
        const gapRight = parseInt(style.marginRight, 10) || 0;  // estrapola in stringa il valore del margine e lo converte in numero
        const gapLeft = parseInt(style.marginLeft, 10) || 0;    // estrapola in stringa il valore del margine e lo converte in numero        
        const itemWidth = items[0].offsetWidth + gapRight + gapLeft; // Larghezza immagine + gap 

        const maxIndex = Math.ceil(items.length - containerWidth / itemWidth);          // arrotonda a nuemro intero più vicino il risultato (num. item - item visibili) per fare in modo che scossa solo fino alla visibilità dell'ultima immagine e non oltre

        let currentIndex = parseInt(carousel.getAttribute("data-current-index")) || 0;  // memorizza la posizione corrente del carosello

        // Aggiorna l'indice corrente in base alla direzione
        if (direction === "next" && currentIndex < maxIndex) {
            currentIndex++;
        } else if (direction === "prev" && currentIndex > 0) {
            currentIndex--;
        }

        // Imposta l'offset per il carosello
        const offset = -currentIndex * itemWidth;                           // calcola la distanza di traslazione orizzontale del carosello
        items.forEach((item) => {
            item.style.transform = `translateX(${offset}px)`;
        });

        // Memorizza l'indice corrente come attributo del carosello
        carousel.setAttribute("data-current-index", currentIndex);
    }

    // Assegna gli eventi di click ai pulsanti di navigazione
    document.querySelectorAll(".nav-button").forEach((button) => {
        button.addEventListener("click", function () {
            const carouselId = this.getAttribute("data-bs-target").substring(1);        // estrapola id da "data-bs-target" del button e toglie il cancelletto
            const direction = this.classList.contains("next") ? "next" : "prev";        // estrapola la classe del button 
            updateCarousel(carouselId, direction);
        });
    });
});








/* funzione per ricaricare l apagina al click del pulsante Search in ricerca */

document.getElementById("searchButton").addEventListener("click", function () {
    location.reload();                                                              // per ricaricare la pagina corrente
})