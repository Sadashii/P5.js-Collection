// Inspiration | https://www.youtube.com/watch?v=55iwMYv8tGI

let frame = 0;
let info;

let density = 0
let directionIsForward = true
const densities = [
  "Ñ@#W$9876543210?!abc;:+=-,._                    ",
  '       .:-i|=+%O#@',
  '        .:░▒▓█'
]

function setup () {
  createCanvas(1280, 720);
  frame = createCapture(VIDEO);
  frame.size(128, 72);
  frame.hide()
  info = createDiv()
}

function keyPressed () {
  console.log(key);
  switch (key) {
    case 'd':
      if (density < densities.length - 1) {
        density++
      } else {
        density = 0
      }
      break;
    case 'a':
      if (density > 0) {
        density--;
      } else {
        density = densities.length - 1;
      }
      break;
    case "w":
      directionIsForward = !directionIsForward;
      break;
    case "s":
      directionIsForward = !directionIsForward;
      break;  
  }
}

function draw () {
  background(0);
  
  frame.loadPixels();
  textAlign(CENTER, CENTER);
  
  for (let x = 0; x < frame.width; x++) {
    for (let y = 0; y < frame.height; y++) {
      let start = (y * frame.width + x) * 4;
      const r = frame.pixels[start + 0];
      const g = frame.pixels[start + 1];
      const b = frame.pixels[start + 2];
      let brightness = 0.375*r + 0.5*g + 0.125*b
      const len = densities[density].length;
      const charIndex = floor(map(brightness, 0, 255, directionIsForward ? 0 : len, directionIsForward ? len : 0));
      const c = densities[density].charAt(charIndex);
      
      fill(255)
      text(c, x * 10, y * 10);
    }
  }
  
  info.html(`
  Character set [a-d key to change]: <span style="color:red">${densities[density]}</span><br/>
  Direction [w-s key to change]: <span style="color:red">${directionIsForward ? "Darker colors get darker characters" : "Darker colors get lighter characters"}</span><br/>
  `)
}