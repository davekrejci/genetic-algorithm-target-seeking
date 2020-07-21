// App Variables
var lifespan = 300;
var maxForce = 0.3;
var running = false;
var count = lifespan;
var generation = 1;
var canvasWidth;
var canvasHeight;
var maxFitness;
var mutationRate = 0.01;

// Canvas Objects to draw
var population;
var target;
var obstacles = new Array();

// DOM elements
var lifeParagraph;
var genParagraph;
var fitnessParagraph;
var mouseParagraph;
var pauseButton;
var resetButton;
var canvasContainer;
var populationSizeSlider;

// set up the app
function setup() {
  initDOM();
  initCanvas();

  //initialize genetic algorithm parameters
  maxFitness = dist(target.x, target.y,10,height/2)

}
// update the app every frame
function draw() {
  if (running) {
    background(50);
    population.run();
    count--;
    if(count == 0){
      population.evaluate();
      population.selection();
      count = lifespan;
      generation++;
    }
    drawTarget();
  }
  cursor(CROSS);
  drawObstacles();
  updateDOM();
  showMousePosition(mouseX, mouseY);
}
// create initial canvas
function initCanvas(){
  canvasWidth = canvasContainer.width * 0.98;
  canvasHeight = canvasContainer.height;
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvasContainer");
  // initialize canvas
  resetCanvas();
  noStroke();
}
// reset the canvas and algorithm parameters
function resetCanvas(){
  population = new Population(populationSizeSlider.value());
  mutationRate = (mutationRateSlider.value()/100);
  obstacles = [];
  count = lifespan;
  generation = 1;
  target = createVector(width-50,height/2);
  background(50);
  drawTarget();
}
// show mouse position in DOM paragraph
function showMousePosition(x, y){
  if(!(x > canvasWidth || x < 0 || y > canvasHeight || y < 0)){
    mouseParagraph.html("x: "+ Number.parseFloat(x).toFixed(0) + "   y: " + Number.parseFloat(y).toFixed(0));   
  } else{
    mouseParagraph.html("");   

  }
}
// do when mouse is pressed
function mousePressed(){
  addObstacle(mouseX,mouseY);
}
// add obstacle to canvas
function addObstacle(x,y){
  if(!(x > canvasWidth || x < 0 || y > canvasHeight || y < 0)){
    obstacles.push(new Obstacle(mouseX,mouseY));
    console.log("obstacles: " + obstacles.length);    
  }
}
//draw target on canvas
function drawTarget(){
  fill(0,255,0);
  noStroke();
  ellipse(target.x, target.y, 16, 16);
}
// draw obstacles on canvas
function drawObstacles(){
  if(obstacles.length>0){
    obstacles.forEach(obstacle => {
      obstacle.draw();
    });
  }
}
// resize and reset canvas on window resize
function windowResized() {
  canvasContainer = select("#canvasContainer");
  canvasWidth = canvasContainer.width * 0.98;
  canvasHeight = canvasContainer.height;
  resizeCanvas(canvasWidth, canvasHeight);
  resetCanvas();
}
// initialize variables for DOM elements
function initDOM(){
  lifeParagraph = select("#lifespan")
  genParagraph = select("#generation");
  fitnessParagraph = select("#fitness");
  mouseParagraph = select("#mousePosition")
  pauseButton = select("#pauseButton");
  resetButton = select("#resetButton");
  canvasContainer = select("#canvasContainer");
  populationSizeSlider = select("#populationSizeSlider");
  populationSizeText = select("#populationSizeText");
  mutationRateSlider = select("#mutationRateSlider");
  mutationRateText = select("#mutationRateText");

  // add listeners to buttons
  pauseButton.mousePressed(function () {
    if(running){
      running = false;
      pauseButton.html("Start");
      pauseButton.style("background-color","#51d655")
    } else {
      running = true;
      pauseButton.html("Pause");
      pauseButton.style("background-color","#F44336")

    }
  })
  resetButton.mousePressed(resetCanvas);
}
// update DOM elements with app variables
function updateDOM(){
  lifeParagraph.html(count);
  genParagraph.html(generation);
  fitnessParagraph.html(Number.parseFloat((population.maxFitness/maxFitness)).toPrecision(2));
  mutationRateText.html(mutationRateSlider.value()/100);
  populationSizeText.html(populationSizeSlider.value());
}

