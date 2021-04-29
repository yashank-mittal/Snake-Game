const canvas = document.getElementById('cava');
const pen = canvas.getContext('2d');
pen.fillStyle = 'yellow';
const cs = 67;
const W = 1200;
let food = null;
const H = 535;
let score = 0;
const snake = {
  init_len:5,
  direction:'right',
  cells:[],
  createsnake: function(){
    for(let i=0;i<this.init_len;i++){
      this.cells.push({
        x: i,
        y: 0
      })
    }
  },
  draw_snake:function(){
    for(let cell of this.cells){
      pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
    }
  },
  update_snake:function(){
    const headX=this.cells[this.cells.length-1].x;
    const headY=this.cells[this.cells.length-1].y;
    if(headX == food.x && headY == food.y){
      food = getrandomfood();
      score++;
    }
    else{
      this.cells.shift();
    }
    let nextx,nexty;
    if(this.direction == 'left'){
      nextx=headX-1;
      nexty=headY;
      
      if(nextx*cs <0){
        clearInterval(id);
        pen.fillStyle = 'lightgreen';
        pen.fillText('Game Over',50,100)
      }
    }
    else if(this.direction == 'up'){
      nextx=headX;
      nexty=headY-1;

      if(nexty*cs <0){
        clearInterval(id);
        pen.fillStyle = 'lightgreen';
        pen.fillText('Game Over',50,100);
      }
    }
    else if(this.direction == 'down'){
      nextx=headX;
      nexty=headY+1;
      
      if(nexty*cs >= H){
        clearInterval(id);
        pen.fillStyle = 'lightgreen';
        pen.fillText('Game Over',50,100)
      }
    }
    else{
      nextx=headX+1;
      nexty=headY;
      
      if(nextx*cs >= W){
        clearInterval(id);
        pen.fillStyle = 'lightgreen';
        pen.fillText('Game Over',50,100)
      }
    }

    // this.cells.shift();
    this.cells.push({
      x: nextx,
      y: nexty
    })
  }
}


//Initialise the game
function init(){
  snake.createsnake();
  food = getrandomfood();
  function keypressed(e){
    // console.log(e);
    // console.log(e.key);
    if(e.key === 'ArrowDown'){
      snake.direction = 'down';
    }
    else if(e.key === 'ArrowUp'){
      snake.direction = 'up';
    }
    else if(e.key === 'ArrowLeft'){
      snake.direction = 'left';
    }
    else{
      snake.direction = 'right';
    }
    console.log(snake.direction);
  }
  document.addEventListener('keydown',keypressed);

}

//Draw
function draw(){
  pen.clearRect(0,0,W,H);
  pen.font = '40px sans-serif';
  pen.fillText(`SCORE ${score}`,50,50)
  pen.fillStyle = 'blue';
  pen.fillRect(food.x*cs,food.y*cs,cs,cs);
  pen.fillStyle = 'yellow';
  snake.draw_snake();
}

//update
function update(){
   snake.update_snake();
}

//Gameloop
function Gameloop(){
  
  draw();
  update();
}

function getrandomfood(){
  const foodx = Math.floor(Math.random()*(W - cs)/cs);
  const foody = Math.floor(Math.random()*(H - cs)/cs);
  const food = {
    x:foodx,
    y:foody
  }
  return food;
}


init();

const id = setInterval(Gameloop,150);