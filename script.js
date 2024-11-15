document.addEventListener("DOMContentLoaded", function () {
    // Funzione per aggiornare il carosello in base all'id
    function updateCarousel(carouselId, direction) {
        const carousel = document.getElementById(carouselId);   // seleziona il carosello
        const items = carousel.querySelectorAll(".item");       // seleziona tutti gli elementi (.item) al suo interno
        const containerWidth = carousel.offsetWidth;            // calcola la lunghezza in px del carosello
        const style = window.getComputedStyle(items[0]);        // ottiene lo stile computato dell'elemento (width+gap+margin...)   
        const gapRight = parseInt(style.marginRight, 10) || 0;  // estrapola in stringa il valore del margine e lo converte il valore in numero
        const gapLeft = parseInt(style.marginLeft, 10) || 0;    // estrapola in stringa il valore del margine e lo converte il valore in numero        
        const itemWidth = items[0].offsetWidth + gapRight + gapLeft; // Larghezza immagine + gap

        const maxIndex = Math.ceil(items.length-containerWidth/itemWidth); // arrotonda a nuemro intero più vicino il risultato (num. item - item visibili)

        let currentIndex = parseInt(carousel.getAttribute("data-current-index")) || 0; // memorizza la posizione corrente del carosello

        // Aggiorna l'indice corrente in base alla direzione
        if (direction === "next" && currentIndex < maxIndex) {
            currentIndex++;
        } else if (direction === "prev" && currentIndex > 0) {
            currentIndex--;
        }

        // Imposta l'offset per il carosello
        const offset = -currentIndex * itemWidth;           // calcola la distanza di traslazione orizzontale del carosello
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