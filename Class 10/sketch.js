
// let synth1 = new Tone.PolySynth(Tone.DuoSynth);
// let synth2 = new Tone.PolySynth(Tone.DuoSynth);

// let bend = new Tone.PitchShift();
// bend.pitch = 0;

// synth1.connect(bend);
// bend.toDestination();

// synth2.connect(bend);
// bend.toDestination();

// let notes = {
//     // 'a' : 200,
//     // 's' : 240, 
//     // 'd' : 200,
//     // 'f' : 300,
//     // 'g' : 340,
//     // 'h' : 360,
//     // 'j' : 400,
//     // 'k' : 460, 
//     'a' : 'C4',
//     's' : 'D4', 
//     'd' : 'E4',
//     'f' : 'F4',
//     'g' : 'G4',
//     'h' : 'A4',
//     'j' : 'B4',
//     'k' : 'C5', 
// }

// function setup() {
//   createCanvas(400, 400);

//   mySelect = createSelect();
//   mySelect.position (100,100);
//   mySelect.option ('Simple Synth');
//   mySlect.option('Duo Synth');
//   mySelect.selected ('Simple Synth');
  
//   pitchSlider = createSlider(0, 12, 0.01);
//   pitchSlider.position (120, 200);
//   pitchSlicder.mouseMoved(() => blend.pitch = pitch.Slider.value());
  
//   }

// function keyPressed(){
//   if(mySelect.selected() === 'Simple Synth') {
//   let playNotes = notes[key];
//   synth.triggerAttackReleased(playNotes, 0.8);
//   } else if (mySelect.selected() === "Duo Synth") {
//     let playNotes = notes[key];
//     synth.triggerAttackReleased(playNotes, 0.8);
//   }
// }

// // function keyReleased(){
// //   let playNotes = notes[key];
// //   synth.triggerAttackReleased(playNotes, '+0.03');
// // }

// function draw() {
//   background (100, 220, 150);
//   text ('play A-K for synth', 100, 200);
// }

let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();

bend.pitch = 0;
synth.connect(bend);
bend.toDestination();

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

function setup() {
  createCanvas(400, 400);

pitchSlider = createSlider(-12, 12, 0, 0.1); //pitch down -12, pitch up 12, starting point is 0
pitchSlider.position (120, 200);
pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());

}

function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes,'+0.03');
}

function draw() {
  background(100, 220, 150);
  text ('play A-K for synth', 140, 180)
}