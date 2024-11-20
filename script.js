/* Funzione per popolare una riga di film */

function populateMovieRow(rowId, start, end) {
    const row = document.getElementById(rowId);                     // richiama il div dove inserire le foto del carosello
    
    const buttonPrev = document.createElement("button")             // crea il primo bottone: prev
    buttonPrev.className = "nav-button prev"
    buttonPrev.setAttribute("data-bs-target", `#${rowId}`)
    buttonPrev.setAttribute("type", "button")
    buttonPrev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" /></svg>'
    row.appendChild(buttonPrev)
    
    const buttonNext = document.createElement("button")             // crea il secondo bottone: next
    buttonNext.className = "nav-button next"
    buttonNext.setAttribute("data-bs-target", `#${rowId}`)
    buttonNext.setAttribute("type", "button")
    buttonNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" /></svg>'
    row.appendChild(buttonNext)
    
    for (let i = start; i <= end; i++) {                           // cicla e crea le card per ogni carosello 
        const imagePath = `assets/imgs/movies/${i}.png`;           // prende l'immagine dalla cartella
        const card = createMovieCard(imagePath, i, i === start);   // crea la card avviando la funzione sottostante
        row.appendChild(card);
    }
}



/* Funzione per creare una card del film */
function createMovieCard(imagePath, i, isFirst) {
    const card = document.createElement('div');                 // crea un div
    card.className = "item d-flex";
    if (isFirst) {                                              // Aggiungi la classe ms-2 solo al primo elemento
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




/* Funzione per popolare le schede descrittive dei film */








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