
let synth = new Tone.PolySynth(Tone.DuoSynth)
let bend = new Tone.PitchShift();

bend.pitch = 0;
synth.connect(bend);
synth.toDestination();

function setup() {
  createCanvas(400, 400);
  
  pitchSlider = createSlider(0, 12, 0.01);
  pitchSlider.position (120, 200);
  pitchSlicder.mouseMoved(() => blend.pitch = pitch.Slider.value());
  
  }

let notes = {
    'a' : 200,
    's' : 240, 
    'd' : 200,
    'f' : 300,
    'g' : 340,
    'h' : 360,
    'j' : 400,
    'k' : 460, 
    // 'a' : 'C4',
    // 's' : 'D4', 
    // 'd' : 'E4',
    // 'f' : 'F4',
    // 'g' : 'G4',
    // 'h' : 'A4',
    // 'j' : 'B4',
    // 'k' : 'C5', 

}

function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttackReleased(playNotes, 0.2);

}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerAttackReleased(playNotes, '+0.03');
}
function draw() {
  background (100, 220, 150);
  text ('play A-K for synth', 100, 200);
}