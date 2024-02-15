let green;
let guy;
let ninja;

function preload() {
  green = new Sprite(200, 200, 80, 80);
  green.spriteSheet = 'assets/green.png';
  let animation1 = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
    walkUp: { row: 5, frames: 6},
    walkDown: { row: 5, col: 6, frames: 6}
  };
  green.anis.frameDelay = 8;
  green.addAnis(animation1);
  green.changeAni('walkRight'); 

  guy = new Sprite(300, 300, 80, 80);
  guy.spriteSheet = 'assets/guy.png';
  let animation2 = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
    walkUp: { row: 5, frames: 6},
    walkDown: { row: 5, col: 6, frames: 6}
  };
  guy.anis.frameDelay = 8;
  guy.addAnis(animation2);
  guy.changeAni('walkRight');

  ninja = new Sprite(100, 100, 80, 80);
  ninja.spriteSheet = 'assets/ninja.png';
  let animation3 = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
    walkUp: { row: 5, frames: 6},
    walkDown: { row: 5, col: 6, frames: 6}
  };
  ninja.anis.frameDelay = 8;
  ninja.addAnis(animation3);
  ninja.changeAni('walkRight');
}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);

  if (keyIsDown(RIGHT_ARROW)) {
    walkRight();
  } else if (keyIsDown(LEFT_ARROW)) {
    walkLeft();
  } else if (keyIsDown(UP_ARROW)) {
    walkUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    walkDown();
  } else {
    stop();
  }

  if(green.x + green.width/4 > width) {
    walkLeft();
  } else if (green.x - green.width/4 < 0){
    walkRight();
  }

  if(guy.x + guy.width/4 > width) {
    walkLeft();
  } else if (guy.x - guy.width/4 < 0){
    walkRight();
  }

  if(ninja.x + ninja.width/4 > width) {
    walkLeft();
  } else if (ninja.x - ninja.width/4 < 0){
    walkRight();
  }
  
}

function stop() {
  green.vel.x = 0;
  green.vel.y = 0;
  green.changeAni('stand');

  guy.vel.x = 0;
  guy.vel.y = 0;
  guy.changeAni('stand');

  ninja.vel.x = 0;
  ninja.vel.y = 0;
  ninja.changeAni('stand');
}

function walkRight() {
  green.changeAni('walkRight');
      green.vel.x = 1;
      green.scale.x = 1;
      green.vel.y = 0;

  guy.changeAni('walkRight');
      guy.vel.x = 1;
      guy.scale.x = 1;
      guy.vel.y = 0;

  ninja.changeAni('walkRight');
      ninja.vel.x = 1;
      ninja.scale.x = 1;
      ninja.vel.y = 0;
}

function walkLeft() {
  green.changeAni('walkRight');
      green.vel.x = -1;
      green.scale.x = -1;
      green.vel.y = 0;

  guy.changeAni('walkRight');
      guy.vel.x = -1;
      guy.scale.x = -1;
      guy.vel.y = 0;

  ninja.changeAni('walkRight');
      ninja.vel.x = -1;
      ninja.scale.x = -1;
      ninja.vel.y = 0;
}

function walkUp() {
  green.changeAni('walkUp');
      green.vel.y = -1;
      green.vel.x = 0;

  guy.changeAni('walkUp');
      guy.vel.y = -1;
      guy.vel.x = 0;
      
  ninja.changeAni('walkUp');
      ninja.vel.y = -1;
      ninja.vel.x = 0;
}

function walkDown() {
  green.changeAni('walkDown');
      green.vel.y = 1;
      green.vel.x = 0;

  guy.changeAni('walkDown');
      guy.vel.y = 1;
      guy.vel.x = 0;

  ninja.changeAni('walkDown');
      ninja.vel.y = 1;
      ninja.vel.x = 0;
}

