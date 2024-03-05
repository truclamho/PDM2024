// function preload(){
//   mouse = loadImage ('assets/mouse.jpeg')
// }
// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   if (mouseIsPressed === ttrue) {
//     background(mouse);
//   } else if (mouseIsPressed === false) {
//     background (240);
//     text ('press mouse', 150, height/3);
//   }
// }

// premade image/sound (was used in class)
// we make our own sound though, no premade

let noise = new Tone.Noise("white"); //pink, brown, of white is possible
let filter = new Tone.Filter (100, "lowpass"); //highpass, lowpass, bandpass, ??

noise.connect(filter);
filter.toDestination();

function keyPressed (){
  if (key === 'q') {noise.start();
    filter.frequency.rampTo(10000, 3)
  } else if (key === 'w') { noise.stop();
    filter.frequency.value = 100;
  }
}

function setup() {
  createCanvas (400, 400);

  filterSlider = createSlider (100, 10000, 100, 0.1);
  filterSlider.position (100, 200);
  filterSlider.mouseMoved (() => {
    filterSlider.value();
  })
  
}

function draw() {
  background (150, 220, 210);
  text('Press Q ro start and W to stop', 100, 100);

  text('Ise slider for filter', 100, 175);
}