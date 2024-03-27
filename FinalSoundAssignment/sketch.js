let sword;
let panel = false; 

let swordsound = new Tone.Synth({
  oscillator: {
    type: "square",
    frequency: 5000,
  },
    envelope : {
      attack: 0.01,
      decay: 0.5,
      sustain: 0.5,
      release: 3,
    }
  }).toDestination();

  let lfo = new Tone.LFO({
    type: "square",
    frequency: 0.3, 
    amplitude: 200,
  });

  let ringModulator = new Tone.ringModulator({
    frequency: 200,
    distortion: 0.5,
  }).toDestination();

  let pitchShift = new Tone.PitchShift({
    pitch: 12,
  }).toDestination();

let reverb = new Tone.Freereverb({
  roomSize: 1, 
  dampening: 1000, 
  wet: 0.5,
}).toDestination();

  swordsound.connect(ringModulator).connect(pitchShift).connect(reverb);
  lfo.connect(swordsound.frequency);
  lfo.start();

function playSwordSound() {
  swordsound.triggerAttackRelease("C2", '8n');
}

function preload() {
  sword = loadImage("assets/sword.png");
}

function setup() {
  createCanvas(600, 800);
  
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
  playSwordSound();

  panel = true;
  } 
}

function mouseReleased() {
  panel = false;
}

function draw() {
  background(220);

  if(panel) {
    image(sword, 0, 0);
  }
}
