const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let cont = 0;
const contagem = document.getElementById('contagem');
const placar = document.getElementById('contagem1');
const buttom = document.getElementById('button');

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        cont = cont + 1;
        contagem.innerHTML = cont;
        if(cont === 6) {
            contagem.innerHTML = 'Parabens, Você Ganhou!!'
            placar.style.display = 'none';
            buttom.style.display = 'block';
            return;
        }
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();
//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

buttom.addEventListener('click', () => {
    document.location.reload(true);
});