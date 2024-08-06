document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'https://i.ebayimg.com/thumbs/images/g/GFMAAOSwguhlSS~z/s-l300.webp',
        'https://i.ebayimg.com/images/g/rtsAAOSwqhVlSS~f/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/ND0AAOSwFANlSTAN/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/GoAAAOSwliVlSTBB/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/EEQAAOSwK7ZlSTCL/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/PrsAAOSwdbVlSTAl/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/k-0AAOSw~LplSS~5/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/4KgAAOSwYcNjNvjE/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/gCEAAOSwkeRlSS-u/s-l1600.jpg',
        'https://i.ebayimg.com/images/g/MuYAAOSwNotlSTB2/s-l1600.jpg'
    ];


    const cardsArray = [...cardImages, ...cardImages];
    let attempts = 0;
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
    let lockBoard = false; 

    const gridContainer = document.getElementById('grid-container');
    const attemptsElement = document.getElementById('attempts');
    const winMessage = document.getElementById('win-message');
    const resetButton = document.getElementById('reset-button');


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    function createBoard() {
        gridContainer.innerHTML = '';
        const shuffledCards = shuffle(cardsArray);
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.cardType = card; 

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.innerHTML = `<img src="${card}" alt="Card Image">`;

            const backFace = document.createElement('div');
            backFace.classList.add('back');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            cardElement.addEventListener('click', flipCard);
            gridContainer.appendChild(cardElement);
        });
    }


    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('flipped') || this.classList.contains('matched')) {
            return;
        }

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            lockBoard = true; 
            checkForMatch();
        }
    }

    
    function checkForMatch() {
        attempts++;
        attemptsElement.textContent = attempts;
        const isMatch = firstCard.dataset.cardType === secondCard.dataset.cardType;
        if (isMatch) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            resetCards();
            if (matchedPairs === cardImages.length) {
                winMessage.style.display = 'block';
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetCards();
            }, 1000);
        }
    }

   
    function resetCards() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false; 
    }


    function resetGame() {
        attempts = 0;
        matchedPairs = 0;
        attemptsElement.textContent = attempts;
        winMessage.style.display = 'none';
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
});
