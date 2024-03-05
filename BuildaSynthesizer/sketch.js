let synth = new Tone.PolySynth;
let change = new Tone.PitchShift();

change.pitch = 0;
synth.connect(change);
change.toDestination();

let notes = {
  '1' : 'C5',
  '2' : 'D5',
  '3' : 'E5',
  '4' : 'F5',
  '5' : 'G5',
  '6' : 'A5',
  '7' : 'B5',
  '8' : 'C6'
}

function setup() {
  createCanvas(400, 400);

changeSlider = createSlider(-20, 20, 0, 0.01); 
changeSlider.position (120, 180);
changeSlider.input(()=> change.pitch = changeSlider.value());

}

function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes);
}

function draw() {
  background(172, 212, 250);
  textSize(20);
  text ('Key 1-8 to Play Synth', 100, 130);
  textSize(12);
  text ('Pitch Changer:', 120, 170);
  text ('Key to note: ', 130, 220);
  text ('1 = C5', 130, 240);
  text ('2 = D5', 130, 255);
  text ('3 = E5', 130, 270);
  text ('4 = F5', 130, 285);
  text ('5 = G5', 130, 300);
  text ('6 = A5', 130, 315);
  text ('7 = B5', 130, 330);
  text ('8 = C6', 130, 345);
}