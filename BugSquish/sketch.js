let spriteSheet;
let chronoSheet;

let walkingAnimation;
let walkingAnimation2;
let chronoAnimation;

let spriteSheetFilenames = ["ladybug.png", "ladybug.png", "ladybug.png"];
let spriteSheets = [];
let animations = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 7, state: GameState.Start, speedMultiplier: 1 };

function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
  textFont(gameFont);
  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(10,30);
  game.speedMultiplier = 1; 

  animations = [];
  for(let i=0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(
      random(spriteSheets),
      62,62,
      random(width),
      random(height),
      6,
      random(0,1) * game.speedMultiplier,
      6,
      random([0,1]));
  }
}

function draw() {
  switch (game.state) {
    case GameState.Playing:
      background(220);
  
      for (let i = 0; i < animations.length; i++) {
        animations[i].draw();
      }
      
      addNewBugs(); 
      
      fill('green');
      textSize(20);
      text("Score: ", 80, 30);
      text(game.score, 150, 30);
      let currentTime = game.maxTime - game.elapsedTime;
      text("Time: ", 315, 30)
      text(ceil(currentTime), 375, 30);
      game.elapsedTime += deltaTime / 1000;
      if (currentTime < 0)
        game.state = GameState.GameOver;
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score, game.maxScore);
      background(0);
      fill(255);
      textSize(30);
      textAlign(CENTER);
      text("Game Over!", 200, 200);
      textSize(25);
      text("Score: " + game.score, 200, 260);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(25);
      textAlign(CENTER);
      text("Ladybug Game", 200, 200);
      textSize(10);
      text("Press Any Key to Start", 200, 250);
      break;
  }
}

function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

let speedIncrement = 0.3; 

function addNewBugs() {
  let spawnInterval = 5;
  if (frameCount % spawnInterval === 0) {
    let newSpeed = 0.3 + speedIncrement * game.score; 
    animations.push(new WalkingAnimation(random(spriteSheets), 62, 62, random(width), random(height), 6, newSpeed, 6, random([0, 1])));
  }
}


function mousePressed() {
  switch (game.state) {
    case GameState.Playing:
      for (let i = 0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX, mouseY);
        if (contains && !animations[i].squished) {
          animations[i].squish();
          game.score += 1;
          for (let j = 0; j < animations.length; j++) {
            animations[j].speed += speedIncrement; 
          }
          let newSpeed = 0.3 + speedIncrement * game.score; 
          animations.push(new WalkingAnimation(random(spriteSheets), 62, 62, random(width), random(height), 6, newSpeed, 6, random([0, 1])));
        }
      }
      break;
  }
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate * speed;
    this.vertical = vertical;
    this.squished = false;
  }

  draw() {
    if (this.squished) {
      this.u = 6;
    } else {
      this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    }
  
    push();
    translate(this.dx, this.dy);
    if (this.vertical) {
      rotate(0);
      scale(this.xDirection, -1); 
    } else {
      rotate(90);
      scale(this.xDirection, 1); 
    }

    
    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u * this.sw + this.offsetX, this.v * this.sh + this.offsetY, this.sw, this.sh);
    pop();
  
    if (!this.squished) {
      let proportionalFramerate = round(frameRate() / this.framerate);
      if (frameCount % proportionalFramerate == 0) {
        this.currentFrame++;
      }
  
      if (this.vertical) {
        this.dy += this.moving * this.speed;
      } else {
        this.dx += this.moving * this.speed;
      }
    }
  }
  
  squish() {
    this.squished = true;
    this.moving = 0; 
  }

  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 7;
    this.v = 8;
  }
}
