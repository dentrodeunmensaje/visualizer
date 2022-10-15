var red, green, blue;
let buttonStatus;
var gui;
var control1, control2, control3;
let toggle = false;
let loopFile;
let fft;

function preload() {
  soundFormats("wav");
  loopFile = loadSound("libraries/files/homenaje.mp3");
  loopFile.loop();
}

function setup() {
  createCanvas(window.innerWidth - 10, window.innerHeight - 8);
  red = 0;
  green = 0;
  blue = 0;
  control1 = red;
  control2 = green;
  control3 = blue;
  playbackRate = 1;
  buttonStatus = false;
  playLoop = new Clickable();
  playLoop.locate(width / 2 -100, height / 2 -33, 0);
  playLoop.width = 200;
  playLoop.height = 66;
  playLoop.text = "Play";
  playLoop.textSize = 26;
  playLoop.strokeWeight = 0;
  playLoop.textColor = color(255, 255, 255, 120);
  playLoop.color = color(45, 45, 45, 80);

  loopStop = new Clickable();
  loopStop.locate(width - 250, height - 80, 0);
  loopStop.width = 200;
  loopStop.height = 66;
  loopStop.text = "Pause";
  loopStop.textSize = 26;
  loopStop.strokeWeight = 0;
  loopStop.textColor = color(255, 255, 255, 120);
  loopStop.color = color(45, 45, 45, 80);

  overdub = new Clickable();
  overdub.locate(width - 250, height - 180, 0);
  overdub.width = 200;
  overdub.height = 66;
  overdub.text = "Add Loop on Top";
  overdub.textSize = 26;
  overdub.strokeWeight = 0;
  overdub.textColor = color(255, 255, 255, 120);
  overdub.color = color(45, 45, 45, 80);

  gui = createGui("Visualization controls");
  sliderRange(0, 255, 0.05);
  gui.addGlobals("control1", "control2", "control3");

  fft = new p5.FFT();
}
function draw() {
  //acumulate();
  colorMode(RGB, 255);
  background(red + control1, green + control2, blue + control3, 20);
  // stroke(blue, green, red);
  // strokeWeight(8);

  let spectrum = fft.analyze();

  //console.log(spectrum);

  push();
  translate(width / 2, height / 2);
  shearX(map(control1, 0, 255, -PI, PI));
  scale(map(control2, 0, 255, 1, 4.0));
  rotate(frameCount / 200.0 * map(control3, 0, 255, 1, 5.0));
  for (let i = 0; i < spectrum.length; i++) {
    const colorByBand = map(i, 0, spectrum.length, 0, 1800);
    noStroke();
    colorMode(HSB, 360, 100, 100);
    stroke(colorByBand, 100, 100,0.3);
    strokeWeight(2);
    strokeCap(SQUARE);
    rotate((2*PI / spectrum.length)*i);
    if (spectrum[i]>0) {
    line(0, 0, 0, map(spectrum[i], 0, 255,0,height/2));
    }
    //text(colorByBand, i * 10, height/2);
  }
  pop();

  if (!buttonStatus) {
    playLoop.draw();
  } else {
    loopStop.draw();
  }
  playLoop.onPress = function () {
    loopFile.play();
    buttonStatus = !buttonStatus;
  };

  loopStop.onPress = function () {
    loopFile.pause();
    buttonStatus = !buttonStatus;
  };

  if (loopFile.isPlaying()) {
    //overdub.draw();
    fill(255);
    textSize(16);
    text("Homenaje a Esther Chávez Cano by Rodrigo Villarreal Jiménez", width / 2 , height / 2, );

  }

  overdub.onPress = function () {
    //loopFile.play();
  };
}

function acumulate() {
  red += random(-1, 2);
  green += random(-2, 1);
  blue += random(-1, 2);
}

function windowResized() {
  resizeCanvas(window.innerWidth - 10, window.innerHeight - 8);
}
