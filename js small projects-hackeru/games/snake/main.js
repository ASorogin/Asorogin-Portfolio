// Constants
const board = document.querySelector("#board");
const width = window.screen.height < 640 ? 10 : 40;
const height = window.screen.height < 640 ? 10 : 40;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
const restartButton = document.getElementById('restartButton');
const GoButton = document.getElementById('keepEat');
const menuDiv = document.querySelector('.menu');
const menuBack = document.querySelector('.pause');

const snakeHead = document.querySelector('.snake-head');   






let gameInterval;
let score = 0;
let currentDirection = 'left'; 
// Functions





// Function to create the game board
function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    // Create grid cells and append to the board
    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
        divs.push(div);
    }

    // Initialize game elements
    color();
    colorRandomFruit();
    
}




// Function to color the snake on the board
function color() {
    divs.forEach(div => {
        div.classList.remove("snake", "snake-head"); // Remove both classes
    });

    snake.forEach((x, index) => {
        if (index === 0) {
            divs[x].classList.add("snake-head"); // Add snake-head class to the head
        } else {
            divs[x].classList.add("snake"); // Add snake class to other segments
        }
    });
   
}


// Function to randomly color a fruit on the board
function colorRandomFruit() {
    let fruitIndex;
    do {
        fruitIndex = Math.floor(Math.random() * (width * height));
    } while (snake.includes(fruitIndex) || divs[fruitIndex].classList.contains("snake"));

    // Remove previous fruit class
    const previousFruit = document.querySelector(".fruit");
    if (previousFruit) {
        previousFruit.classList.remove("fruit");
    }

    // Add fruit class to new random position
    divs[fruitIndex].classList.add("fruit");
}


document.addEventListener('keydown', handleKeyPress);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// Variable to store the starting touch position
let touchStartX = 0;
let touchStartY = 0;

function handleKeyPress(event) {
    event.preventDefault();
    switch (event.key) {
        case 'ArrowUp':
            if (currentDirection !== 'down'){ 
                move('up');
                currentDirection = 'up';
            }
            break;
        case 'ArrowDown':
            if (currentDirection !== 'up'){
                move('down');
                currentDirection = 'down';
            }
            break;
        case 'ArrowLeft':
            if (currentDirection !== 'right'){ 
                move('left');
                currentDirection = 'left';
            }
            break;
        case 'ArrowRight':
            if (currentDirection !== 'left'){
                move('right');
                currentDirection = 'right';
            }
            break;
        case 'Escape':
            clearInterval(gameInterval)
            break;
         
    }
    
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // Determine the direction of swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            if (currentDirection !== 'left'){
                move('right');
                currentDirection = 'right';
            }
        } else {
            if (currentDirection !== 'right'){ 
                move('left');
                currentDirection = 'left';
            }
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            if (currentDirection !== 'up'){
                move('down');
                currentDirection = 'down';
            }
        } else {
            if (currentDirection !== 'down'){
                move('up');
                currentDirection = 'up';
            } }



            
            }    // Reset touch start positions
    touchStartX = 0;
    touchStartY = 0;
}


// Function to handle the snake movement
function move(dir, snakeHead) {
    let lastIndex = snake[1];
    let head = snake[0];
    

    if (dir === 'up') {
        head -= width;
    } else if (dir === 'down') {
        head += width;
    } else if (dir === 'left') {
        head++;
    } else if (dir === 'right') {
        head--;
    }
    

   
    if (head < 0 || head >= width * height ||
        dir === 'left' && head % width === 0 ||
        dir === 'right' && (head + 1) % width === 0 ||
        snake.slice(1).includes(head)) {
        endGame();
        return;
    }
    console.log(head)
    console.log(lastIndex)
    snake.unshift(head);
    snake.pop();
    color();
    removeFruitClass();
    autoMove();
}







// Function to remove fruit class and add score
function removeFruitClass(fruitIndex) {
    const divsWithTwoClasses = document.querySelectorAll('div[class^="fruit"]');
    divsWithTwoClasses.forEach(div => {
        const classes = div.classList;
        if (classes.length === 2 && div.dataset.index === fruitIndex) {
            const newIndex = parseInt(fruitIndex);
            snake.push(newIndex);
            colorRandomFruit();
            sound1("/Pebble.ogg")
            score++;
            document.getElementById("score").textContent = score;
        }
    });
}



// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Clear the interval
    sound2("/Country_Blues.ogg")
    snake.splice(0); // Reset the snake
    snake.push(...[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]); 
    color(); // Reset the colors
    currentDirection = 'left'; // Reset the direction
    score = 0; // Reset the score
    
}

function autoMove() {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => move(currentDirection),2000 / snake.length)
}
function sound1(fileName) {
    const audio = document.createElement('audio');
    audio.src = "/Pebble.ogg";
    audio.play();
}
function sound2(fileName) {
    const audio = document.createElement('audio');
    audio.src = "/Country_Blues.ogg";
    audio.play();
}









// Create the game board
createBoard();
