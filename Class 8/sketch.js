
let soundFX, button1, button2;

function preload() {
soundFX = new Tone.players ({
  blackbird : "assets/blackbird.mp3",
  owl : "assets/owl.mp3"
}).toDestination(); //tells your audio to go to youre speakers
}

// function keyPressed() {
//   if(key === 'q') {
//     soundFX.player('blackbird').start();
//   } else if (key === 'w') {
//     soundFX.player('owl').start();
//   }
// }

function setup() {
  createCanvas(400, 400);


  button1 = createButton('Blackbird Maker');
  button1.position (85,150);
  // button1.mousePressed (play1);
  // button1.mousePressed (() =>  soundFX.player ('blackbird').start() );


  button2 = createButton('Owl Maker');
  button2.position (205,150);
  // button2.mousePressed (play2);
  // button2.mousePressed (() =>  soundFX.player ('owl').start() );

}

// function play1() {
//   soundFX.player ('blackbird').start();
// }

// function play2() {
//   soundFX.player ('owl').start();
// }
// does not need the function play when you add the () =>  soundFX.plauer ('blackbird').start() thingies

function draw() {
  background(220, 100, 200);
  // text("Press Q or W", 120, 150)
}
