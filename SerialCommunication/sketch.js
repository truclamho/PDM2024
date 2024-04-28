let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;

let latest = port.readUntil("\n").trim();
let values = latest.split(",");

function setup() {
  port = createSerial();
  createCanvas(400, 400);
  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(60);
}

function draw() {
  background(220);

  let latest = port.readUntil("\n").trim();
  let values = latest.split(",");
  if (values.length > 2) {
    joyX = parseInt(values[0]);
    joyY = parseInt(values[1]);
    sw = parseInt(values[2]);

    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    } else if (joyY < 0) {
      circleY -= speed;
    }
  }

  // Determine the background color based on the circle's position
  noStroke();
  if (circleX < width / 2) {
    fill('grey');  // Left side turns grey
    rect(0, 0, width / 2, height);
    fill('lightgreen');
    rect(width / 2, 0, width / 2, height);
  } else {
    fill('skyblue');
    rect(0, 0, width / 2, height);
    fill('grey');  // Right side turns grey
    rect(width / 2, 0, width / 2, height);
  }

  // Draw the circle
  stroke(0);
  if (sw == 1) {
    fill("blue");
  } else {
    fill(255);
  }
  circle(circleX, circleY, 20);  // Increased circle size for visibility

  // Communicate with Arduino if needed
  if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    console.log(pixel);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);
  }
}

function mousePressed() {
  if (mouseX < width / 2) {
    port.write('1'); // Turn on the blue LED
  } else {
    port.write('0'); // Turn off the blue LED
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}
