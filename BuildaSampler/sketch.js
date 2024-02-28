let sounds = new Tone.Players ({
  'beach' : "assets/beach.mp3",
  'moorland' : "assets/moorland.mp3",
  'rain' : "assets/rain.mp3",
  'stream' : "assets/stream.mp3"
});


let pitchShift = new Tone.PitchShift({ pitch: 0});

let button1, button2, button3, button4; 
let pitchSlider;

sounds.connect(pitchShift);
pitchShift.toDestination();


sounds.toDestination();

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Beach Sound');
  button1.position(80, 100);
  button1.mousePressed(() => sounds.player('beach').start());

  button2 = createButton('Moorland Sound');
  button2.position(190, 100);
  button2.mousePressed(() => sounds.player('moorland').start());

  button3 = createButton('Rain Sound');
  button3.position(85, 150);
  button3.mousePressed(() => sounds.player('rain').start());

  button4 = createButton('Stream Sound');
  button4.position(195, 150);
  button4.mousePressed(() => sounds.player('stream').start());

  pitchSlider = createSlider(-48, 48, 0, 0.01);
  pitchSlider.position(140, 260);
  pitchSlider.mouseMoved(() => pitchShift.pitch = pitchSlider.value);
}


function draw() {
  background(147, 182, 237);
  text("Choose a sound: ", 140, 50, 300);
  text("Pitch Shifter: ", 60, 263, 300);
}

