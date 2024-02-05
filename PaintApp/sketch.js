const paletteColors = [
  [255, 0, 0], //red
  [255, 128, 0], //orange
  [255, 255, 0], //yellow
  [0, 255, 0], //green
  [0, 255, 255], //light blue
  [0, 0, 255], //blue
  [255, 0, 255], //purple
  [102, 51, 0], //brown
  [255, 255, 255], //white
  [0, 0, 0], //black
];

const circleSize = 15;
const paletteSize = 50;
const margin = 5;

let currentColor = [255, 0, 0];

function setup() {
  createCanvas(1000, 700);
  colorMode(RGB, 255, 255, 255);
  background(240, 240, 240);
  noStroke();
}

function drawPalette() {
  for(let i = 0; i < paletteColors.length; i++) {
    let x = margin;
    let y = i * (paletteSize + margin) + margin;

    fill(paletteColors[i]);
    square(x, y, paletteSize);
  }
  
}

function mousePressed() {
  for(let i = 0; i < paletteColors.length; i++) {
    let x = margin;
    let y = i * (paletteSize + margin) + margin;

    if (mouseX > x && mouseX < x + paletteSize && mouseY > y && mouseY < y + paletteSize) {
    currentColor = paletteColors[i];
    break;
  }
  }
}

function draw() {
  if(mouseIsPressed) {
    fill(currentColor);
    ellipse(mouseX, mouseY, circleSize, circleSize);
    curve(pmouseX, pmouseY, mouseX, mouseY, mouseX, mouseY, pmouseX, pmouseY);
  }
  drawPalette();
}
