// Population Object
function Population(size){
    
    // CONSTRUCTOR
    this.population = [];
    this.populationSize = size;
    this.matingPool = [];
    this.maxFitness = 0;
  
    for (var i = 0; i < this.populationSize; i++) {
      this.population[i] = new Rocket();
    }

    this.bestDNA = function(){
      var bestFitness = 0;
      var bestFitnessPosition = 0;
      for (var i = 0; i < this.populationSize; i++) {
        if(this.population[i].fitness > bestFitness){
          bestFitness = this.population[i].fitness;
          bestFitnessPosition = i;
        }
      }
      return this.population[bestFitnessPosition].dna
    }
  
    // METHODS
    this.run = function(){
      for (var i = 0; i < this.populationSize; i++) {
        this.population[i].update();
        this.population[i].show();
      }
    }
    this.evaluate = function () {
      for (let i = 0; i < this.populationSize; i++) {
        this.population[i].calculateFitness();
        if (this.population[i].fitness > this.maxFitness) {
          this.maxFitness = this.population[i].fitness
        }
      }
      // Normalize fitness values to range 0-1
      for (let i = 0; i < this.populationSize; i++) {
        this.population[i].fitness /= this.maxFitness;
      }
  
      this.matingPool = [];
      for (let i = 0; i < this.populationSize; i++) {
        var n = this.population[i].fitness * 100;                                                                
        for (let j = 0; j < n; j++) {
          this.matingPool.push(this.population[i])
        }
      }
    }
    this.selection = function () {
      var newPopulation = [];

      // Elitism - pass best rocket from previous generation to new generation
      var bestDNA = this.bestDNA();
      bestDNA.mutation();
      newPopulation.push(new Rocket(bestDNA));

      for (let i = 0; i < this.population.length - 1; i++) {
        var parentA = random(this.matingPool).dna;
        var parentB = random(this.matingPool).dna;
        var child = parentA.crossover(parentB);
        child.mutation();
        newPopulation.push(new Rocket(child));
      }
      this.population = newPopulation;
    }
  }