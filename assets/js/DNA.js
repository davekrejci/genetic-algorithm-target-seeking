// DNA Object
function DNA(genes) {

    // CONSTRUCTOR
    if (genes) {
      this.genes = genes;
    } else{
        this.genes = [];
        for (let i = 0; i < lifespan; i++) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxForce);
        }
    }

    // METHODS
    this.crossover = function(partner){
      var newgenes = [];
      var mid = floor(random(this.genes.length))
      for (let i = 0; i < this.genes.length; i++) {
        if(i > mid){
          newgenes[i] = this.genes[i];
        } else{
          newgenes[i] = partner.genes[i];
        }
      }
      return new DNA(newgenes);
    }
    this.mutation = function () {
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < mutationRate) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxForce);
        }
      }
    }
  
  }
