// Rocket Object
function Rocket(dna) {
    
    // CONSTRUCTOR
    this.position = createVector(10,height/2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;
    this.r = 5.0;

    if(dna){
      this.dna = dna;
    } else{
      this.dna = new DNA();
    }
  
    // METHODS
    this.applyForce = function(force){
      this.acceleration.add(force);
    }
    this.update = function () {  
      var distance = dist(this.position.x,this.position.y,target.x,target.y);
      if (distance < 10) {
        this.completed = true;
        this.position = target.copy();
      }
      this.detectCollision();
      
      this.applyForce(this.dna.genes[count]);
      if (!this.completed && !this.crashed) {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0)
      }
    }
    this.show = function () { 
      var theta = this.velocity.heading() + radians(90);
      fill(127);
      stroke(200);
      push();
      translate(this.position.x,this.position.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.r*2);
      vertex(-this.r, this.r*2);
      vertex(this.r, this.r*2);
      endShape(CLOSE);
      pop();
    }
    this.calculateFitness = function(){
      var distance = dist(this.position.x,this.position.y,target.x,target.y);
      this.fitness = map(distance, 0, width, width, 0);
      if (this.completed) {
        this.fitness *= 10;
      }
      if (this.crashed) {
        this.fitness = this.fitness - (this.fitness*0.8);
      }
    } 
    this.detectCollision = function(){
      // Detect Colision with each obstacle
      obstacles.forEach(obstacle => {
        
        if(this.position.x > obstacle.x && this.position.x < obstacle.x + obstacle.width && this.position.y > obstacle.y && this.position.y < obstacle.y + obstacle.height){
          this.crashed = true;
        }
      });
      
      // Detect Collision with Canvas Borders
      if(this.position.x > width || this.position.x < 0){
        this.crashed = true;
      }
      if(this.position.y > height || this.position.y < 0){
        this.crashed = true;
      }

      

    }
  }