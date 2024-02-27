let sounds = new Tone.Players ({
  'blackbird': "assets/blackbird.mp3",
  'owl': "assets/owl.mp3"
});
let delAmt = new Tone.FeedbackDelay ("8n", 0.5);
let distAmt = new Tone.Distortion(0.5);

let button1, button2;
let delaySlider, fbSlider, distSlider;

sounds.connect(delAmt);
delAmt.connect(distAmt);
distAmt.toDestination();

sounds.toDestination();

function setup() {
  createCanvas(400, 400);

  button1 = createButton ('Blackbird Maker');
  button1.position (85, 150);
  button1.mousePressed(() => sounds.player('blackbird').start());

  button2 = createButton ('Owl Maker');
  button2.position (205, 150);
  button2.mousePressed(() => sounds.player('owl').start());

  delaySlider = createSlider (0, 1, 0, 0.05);
  delaySlider.position (120, 200);
  delaySlider.mouseMoved (() => delAmt.delayTime.value = delaySlider.value);

  fbSlider = createSlider (0, 0.9, 0, 0.05);
  fbSlider.position (120, 250);
  fbSlider.mouseMoved (() => delAmt.feedback.value = fbSlider.value ());

  distSlider = createSlider (0, 0.9, 0, .05);
  distSlider.position (120, 300);
  distSlider.mouseMoved (() => distAmt.distortion = distSlider.value());

}

function draw() {
  background(220, 220);
}



// 2/27/24 Beginning of Class 10 (she showed how to do with loop)

// let sounds = new Tone.Players ({
//   'blackbird': "assets/blackbird.mp3",
//   'owl': "assets/owl.mp3"
// });
// let delAmt = new Tone.FeedbackDelay ("8n", 0.5);
// let distAmt = new Tone.Distortion(0.5);

// let button1, button2;
// let delaySlider, fbSlider, distSlider;

// let soundNames = ['blackbird', 'owl'];
// let buttons = [];

// sounds.connect(delAmt);
// delAmt.connect(distAmt);
// distAmt.toDestination();

// function setup() {
//   createCanvas(400, 400);

//   soundNames.forEach((names, index) => {
//     buttons[index] = createButton (names);
//     buttons[index].postion (120, 100 + index*50);
//     buttons[index].mousePressed (() => sounds.player(names).start());
//   }
//   )

//   delaySlider = createSlider (0, 1, 0, 0.05);
//   delaySlider.position (120, 200);
//   delaySlider.mouseMoved (() => delAmt.delayTime.value = delaySlider.value);

//   fbSlider = createSlider (0, 0.9, 0, 0.05);
//   fbSlider.position (120, 250);
//   fbSlider.mouseMoved (() => delAmt.feedback.value = fbSlider.value ());

//   distSlider = createSlider (0, 0.9, 0, .05);
//   distSlider.position (120, 300);
//   distSlider.mouseMoved (() => distAmt.distortion = distSlider.value());

// }

// function draw() {
//   background(220, 220);
// }

