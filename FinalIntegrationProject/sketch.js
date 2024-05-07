let prince;
let backgroundImage;
let starImg, greyImg, redImg;  
let stars = [];
let meteors = [];
let lives = 3; 
let score = 0; 
let gameFont;
let port;
let joyX = 0;
let connectButton;
let circleX, circleY;
let speed = 3;
let collectmusic, backgroundmusic; 
let gameEndingMusic;


const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 10, state: GameState.Start};

function preload() {
  backgroundImage = loadImage('assets/background.jpg');
  starImg = loadImage('assets/star.png'); 
  greyImg = loadImage('assets/grey.png');
  redImg = loadImage('assets/red.png');

  prince = new Sprite(200, 550, 80, 80);  
  prince.spriteSheet = loadImage('assets/prince.png'); 
  let animations = {  
    stand: {row: 0, frames: 1},
    walkRight: {row: 0, col: 1, frames: 8},
    walkUp: {row: 5, frames: 6},
    walkDown: {row: 5, col: 6, frames: 6}
  };
  prince.addAnimations(animations); 
  prince.changeAnimation('stand');  
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");

  collectmusic = new Tone.Synth({
    oscillator: {
      type: "sine",
      frequency: 1000,
    },
    envelope: {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.05,
      release: 0.1,
    }
  }).toDestination();
  collectmusic.volume.value = 10; 

  hitmusic = new Tone.Synth({
    oscillator: {
      type: "square",
      frequency: 1000,
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.3,
      release: 0.1,
    }
  }).toDestination();
  
  const panner = new Tone.Panner(0); 
  hitmusic.connect(panner);
  
  panner.pan.value = 0; 
  
  hitmusic.volume.value = 40;

  backgroundmusic = new Tone.Player("assets/final.mp3").toDestination();
  backgroundmusic.loop = true; 
  backgroundmusic.volume.value = -10;

  gameEndingMusic = new Tone.Player("assets/gameending.mp3").toDestination();
  gameEndingMusic.loop = true; 

}

function setup() {
  port = createSerial();
  createCanvas(600, 600);
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(90);

  textFont(gameFont);
}

const LED_GREEN = 3;
const LED_YELLOW = 4;
const LED_RED = 5;


function updateLEDs(lives) {
  switch (lives) {
    case 2:
      digitalWrite(LED_GREEN, LOW);
      break;
    case 1:
      digitalWrite(LED_YELLOW, LOW);
      break;
    case 0:
      digitalWrite(LED_RED, LOW);
      break;
  }
}


function keyPressed() {
  if (keyCode === ENTER) {
    if (game.state === GameState.Start) {
      startGame();
    } else if (game.state === GameState.GameOver) {
      resetGame();
    }
  }
}

function draw() {
  switch (game.state) {
    case GameState.Start:
      startScreen();
      break;
    case GameState.Playing:
      playGame();
      break;
    case GameState.GameOver:
      gameOverScreen();
      break;
  }

  let latest = port.readUntil("\n").trim();
  let values = latest.split(","); 
  if (values.length > 0) { 
    joyX = parseInt(values[0]); 


    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }
  }

  if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);
  }
  let arduinoSignal = port.read();
 
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}

function startGame() {
  game.state = GameState.Playing;
  Tone.start(); 
  backgroundmusic.start();
}

function resetGame() {
  game.state = GameState.Start;
  game.score = 0;
  game.elapsedTime = 0;
  lives = 3; 
}

function startScreen() {
  background('lightblue');
  fill('255');
  textAlign(CENTER);
  textSize(30);
  text("Wishing on a Star", width / 2, height / 2 - 50);
  textSize(15);
  text("Press ENTER to start the game", width / 2, height / 2);
}

function startGame() {
  game.state = GameState.Playing;
  Tone.start(); 
  backgroundmusic.start();
}

function gameOverScreen() {
  backgroundmusic.stop();
  background('lightblue');
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to play again", width / 2, height / 2 + 50);
  
  port.write("3\n");
}


function detectCollision(sprite, obj) {
  let princeLeft = sprite.position.x + sprite.width * 5.7; 
  let princeRight = sprite.position.x + sprite.width * 0.1; 
  let princeTop;
  if (obj instanceof FallingObject && obj.img === starImg) {
    princeTop = sprite.position.y + sprite.height * 6;
  } else {
    princeTop = sprite.position.y + sprite.height * 5.5; 
  }
  let princeBottom = sprite.position.y + sprite.height * 0.7; 

  let objLeft = obj.x;
  let objRight = obj.x + obj.img.width;
  let objTop = obj.y;
  let objBottom = obj.y + obj.img.height;

  return (
    princeRight > objLeft &&
    princeLeft < objRight &&
    princeBottom > objTop &&
    princeTop < objBottom
  );
}

function playGame() {
  background(backgroundImage);

  prince.draw();

  if (random() < 0.02) {
    let obj = new FallingObject(starImg, random(width * -1, 550), -150, random(1, 6));
    stars.push(obj);
  } else if (random() < 0.05) {
    let img = random() < 0.05 ? greyImg : redImg;
    let obj = new FallingObject(img, random(width * -1, 550), -150, random(1, 6));
    meteors.push(obj);
  }

  updateObjects(stars);
  updateObjects(meteors);

  handlePlayerMovement();

  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 10, 30);
  
  let livesText = "Lives: " + lives;
  textAlign(RIGHT);
  text(livesText, width - 10, 30);

  switch (lives) {
    case 2:
      port.write("0\n"); 
      break;
    case 1:
      port.write("1\n"); 
      break;
    case 0:
      port.write("2\n"); 
      break;
  }

}


function collectStarsSound() {
  collectmusic.triggerAttackRelease("C4", '8n');
  
}

function playhitSound() {
  collectmusic.triggerAttackRelease("C1", '8n');
}

function updateObjects(objects) {
  let princeHit = false;
  
  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].move();
    objects[i].display();
    if (detectCollision(prince, objects[i])) {
      if (objects[i].img === redImg || objects[i].img === greyImg) {
        lives--;
        princeHit = true;
        playhitSound();
        if (lives === 0) {
          game.state = GameState.GameOver;
        }
        port.write("0"); 
      } else if (objects[i].img === starImg) {
        score++;
        princeHit = true;
        collectStarsSound();
        port.write("1"); 
      }
      objects.splice(i, 1);
    }
  }

  if (!princeHit && lives === 0) {
    game.state = GameState.GameOver;
  }
  if (lives === 0) {
    gameEndingMusic.start();
  }
}

// function handlePlayerMovement() {
//   let moveSpeed = 5;

//   if (keyIsDown(RIGHT_ARROW)) {
//     console.log("Right arrow pressed"); 
//     prince.changeAnimation('walkRight');
//     prince.velocity.x = moveSpeed;
//     prince.scale.x = 1; 
//   } 
//   else if (keyIsDown(LEFT_ARROW)) {
//     console.log("Left arrow pressed"); 
//     prince.changeAnimation('walkRight'); 
//     prince.velocity.x = -moveSpeed;
//     prince.scale.x = -1; 
//   } 

//   else {
//     console.log("No arrow keys pressed"); 
//     prince.changeAnimation('stand');
//     prince.velocity.x = 0;
//   }

//   prince.position.x += prince.velocity.x;

//   prince.position.x = constrain(prince.position.x, prince.width / 2, width - prince.width / 2);
// }

console.log("joyX value:", joyX);

const DEADZONE = 20;
let lastMoveTime = 0; 

function handlePlayerMovement() {
  let moveSpeed = 5;
  let currentTime = millis(); 

  if (joyX > DEADZONE || joyX < -DEADZONE) {
    console.log("Moving");
    lastMoveTime = currentTime; 
    if (joyX > DEADZONE) {
      prince.changeAnimation('walkRight');
      prince.velocity.x = moveSpeed;
      prince.scale.x = 1;
    } else {
      prince.changeAnimation('walkRight');
      prince.velocity.x = -moveSpeed;
      prince.scale.x = -1;
    }
  } else {
    if (currentTime - lastMoveTime >= 80) {
      console.log("Not moving for 2 seconds");
      prince.changeAnimation('stand');
      prince.velocity.x = 0;
    }
  }

  prince.position.x += prince.velocity.x;
  prince.position.x = constrain(prince.position.x, prince.width / 2, width - prince.width / 2);
}



class FallingObject {
  constructor(img, x, y, speed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move() {
    this.y += this.speed;
  }

  display() {
    image(this.img, this.x, this.y, this.img.width * 0.09, this.img.height * 0.09); 
  }

  offScreen() {
    return this.y > height;
  }
}
