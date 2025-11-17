// ==========================
// 1️⃣ Canvas setup
// ==========================
let board = document.getElementById("board");
let boardWidth = 360;
let boardHeight = 640;
board.width = boardWidth;
board.height = boardHeight;
let context = board.getContext("2d");

// ==========================
// 2️⃣ Bird setup
// ==========================
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

let birdImg = new Image();
birdImg.src = "picture/flappybird.png";

// ==========================
// 3️⃣ Pipes setup
// ==========================
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg = new Image();
topPipeImg.src = "picture/toppipe.png";

let bottomPipeImg = new Image();
bottomPipeImg.src = "picture/bottompipe.png";

// ==========================
// 4️⃣ Physics & Game variables
// ==========================
let velocityY = 0; // Bird ki vertical speed
let gravity = 0.4; // Gravity
let velocityX = -2; // Pipe move speed

let score = 0;
let gameOver = false;

// ==========================
// 5️⃣ Bird jump on key press
// ==========================
document.addEventListener("keydown", function(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
        velocityY = -6; // Jump
        if(gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
});

// ==========================
// 6️⃣ Game loop
// ==========================
function update() {
    context.clearRect(0, 0, board.width, board.height); // Purana frame clear

    // Bird movement
    velocityY += gravity;
    bird.y += velocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Bird hit top/bottom
    if(bird.y > board.height || bird.y < 0){
        gameOver = true;
    }

    // Pipes movement
    for(let i=0; i<pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        // Accurate scoring
        if(!pipe.passed && bird.x > pipe.x + pipe.width/2){
            score += 0.5;
            pipe.passed = true;
        }

        // Collision detection
        if(detectCollision(bird, pipe)){
            gameOver = true;
        }
    }

    // Remove offscreen pipes
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }

    // Score display
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(Math.floor(score), 5, 45);

    // Game over text
    if(gameOver){
        context.fillText("GAME OVER", 5, 100);
    }

    requestAnimationFrame(update); // Next frame
}

// ==========================
// 7️⃣ Pipe generation
// ==========================
function placePipes() {
    if(gameOver) return;

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

// ==========================
// 8️⃣ Collision detection
// ==========================
function detectCollision(a, b){
    let padding = 2; // safe margin
    return a.x + padding < b.x + b.width &&
           a.x + a.width - padding > b.x &&
           a.y + padding < b.y + b.height &&
           a.y + a.height - padding > b.y;
}

// ==========================
// 9️⃣ Start game after bird image loads
// ==========================
birdImg.onload = function() {
    update();
    setInterval(placePipes, 1500); // 1.5 sec per pipe set
};













