function setup() {
  createCanvas(400, 1300);
  colorMode(HSB, 360, 100, 100,255);
}

function draw() {
  background(255);
  fill('#7fff00');
  noStroke();
  rect(20, 20, 350, 200);
  fill('white');
  stroke(0);
  strokeWeight(2);
  circle(110, 120, 140);
  square(200, 50, 140); 

  noStroke();
  fill(0, 100, 100, 80);
  circle(200, 350, 180);
  fill(240, 100, 100, 80);
  circle(140, 460, 180);
  fill(120, 100, 100, 80);
  circle(250, 460, 180);

  fill('black');
  rect(20, 600, 350, 200);
  fill('yellow');
  arc(100, 700, 150, 150 , -40, 40);
  fill(16, 100, 100);
  square(200, 630, 140, 70, 70, 0, 0);
  fill('white');
  circle(240, 700, 40);
  circle(300, 700, 40);
  fill('blue');
  circle (240, 700, 25);
  circle(300, 700, 25);

  fill(240, 100, 50);
  square(20, 840, 350);
  fill('green');
  stroke('white');
  strokeWeight(5);
  circle(190, 1020, 200);
  fill('red');
  beginShape();
    vertex(190, 920); //1
    vertex(220, 990); //2
    vertex(285, 990); //3
    vertex(230, 1040); //4
    vertex(250, 1100); //5
    vertex(190, 1060); //6
    vertex(130, 1100); //7
    vertex(150, 1040); //8
    vertex(95, 990); //9
    vertex(160, 990); //10
    endShape(CLOSE);

}