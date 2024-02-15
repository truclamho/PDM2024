let luffy;
let rotation = 0;
let score = 0;
let speed = 3;
let timeRemaining = 15;
let gameOver = false;
let success, fail, normal;
let lastAttempt;
let gameFont;

function preload() {
  luffy = loadImage("assets/luffy.png");
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  success = color('blue');
  fail = color('red');
  normal = color('white');
  lastAttempt = normal; 

  textFont(gameFont);
}

function draw() {
  background(lastAttempt);

  if(gameOver) {
    gameDone();
  } else {
    playing();
  }
}

function playing() {
  push();
    translate(width/2,height/2);
    rotate(rotation += speed);
    image(luffy, 0,0, luffy.width/3,luffy.height/3);
  pop();

  if (rotation >= 360) 
    rotation = 0;

  textSize(16);
  text("Score: " + score,20,20); 
  text("Time: " + ceil(timeRemaining), width-150,20);

  timeRemaining -= deltaTime / 1000;
  if (timeRemaining < 0) {
    lastAttempt = normal;
    gameOver = true;
  }
}

function gameDone() {
  text("Time's Up!", 100,100);
  text("Score: " + score, 100, 150);
  text("Press Space to Play Again.", 100, 200);
}

function keyTyped() {
  if (key === ' ') {
    if (gameOver) {
      timeRemaining = 15;
      score = 0;
      gameOver = false;
    }
    else {
      if (rotation >= 345 || rotation <= 15) {
        score++;
        lastAttempt = success;
      } else {
        score--;
        lastAttempt = fail;
      }
    }
  }
}