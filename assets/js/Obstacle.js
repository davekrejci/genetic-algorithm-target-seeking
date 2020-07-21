
// Object for rectangular obstacle
function Obstacle(x, y){

    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 150;

    this.draw = function(){
        fill(244,67,54);
        noStroke();
        rect(this.x,this.y,this.width,this.height);
    }

}