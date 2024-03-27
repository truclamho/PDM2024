let sequence1, square;
let melody = ["C3", ["E3", "G3", "D3", "C3"], "A3", "B2", "C2", "E3", ["A2", "G2"], "C4"];

square = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope : {
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.1
  }
}).toDestination();

sequence1 = new Tone.Sequence (function (time,note){
  square.triggerAttackRelease(note, 0.8); // 0.8 can be changed to make notes shorter or longer
}, melody, "4n"); //"4n" can be changed to other note values like "8n" to speed up or slow down

Tone.Transport.start(); //starts computer clock
Tone.Transport.bpm.value = 100; // can speed up or slow down sequence here
Tone.Transport.timeSignature = [3,4]; // this would be 3/4 time. Will default to 4/4 without this

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(150, 100, 200);
  text ('Hold mouse for sound', width/3, height/2)
}

function mousePressed (){
  Tone.start();
  sequence1.start();
}

function mouseReleased (){
  sequence1.stop();
}