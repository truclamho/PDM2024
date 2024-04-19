let port;

function setup() {
  port = createSerial();
  createCanvas(400, 400);

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(20);
}

function draw() {
  background(220);
  fill('skyblue');
  rect(0, 0, width / 2, height);
  fill('lightgreen');
  rect(width / 2, 0, width / 2, height);
}

function mousePressed() {
  if (mouseX < width / 2) {
    port.write('1'); 
  } else {
    port.write('2'); 
  }
}

function serverConnected() {
  console.log('Connected to Server');
}

function portOpen() {
  console.log('The serial port opened.');
}

function serialEvent() {
  let inString = port.readStringUntil('\r\n');
  console.log('Received: ' + inString);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function connect() {
  if (!port.opened()) {
    port.open('/dev/cu.usbmodem2101', 57600); 
  } else {
    port.close();
  }
}

