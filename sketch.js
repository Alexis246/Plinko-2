var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score;
var particle;
var turn;
var gameState;
var ballCount;

function setup() {
  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  score = 0;
  turn = 0;
  ballCount = 0;
  gameState = "play";

   for (var i = 0; i <=width; i = i + 80){
     divisions.push(new Divisions(i, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var i = 75; i <=width; i=i+50){
       plinkos.push(new Plinko(i,75));
    }

    for (var i = 50; i <=width-10; i=i+50){
       plinkos.push(new Plinko(i,175));
      }

     for (var i = 75; i <=width; i=i+50){
       plinkos.push(new Plinko(i,275));
    }

     for (var i = 50; i <=width-10; i=i+50){
       plinkos.push(new Plinko(i,375));
    }  
}

function draw() {
  background("black");
  Engine.update(engine);
  ground.display();

  textSize(20);
  fill("white");
  text("Score: " + score,20,20);
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   
   if (particle != null){
   particle.display();

   if (particle.body.position.y>760)
        {
          if (particle.body.position.x < 160) 
          {
            score=score+500;  
            if ( ballCount>= 5){
              gameState ="end"; 
            }                         
          }else if (particle.body.position.x < 320 && particle.body.position.x > 160 ){
            score = score + 100;
            if ( ballCount>= 5){
              gameState ="end";
            }

          }else if (particle.body.position.x > 320 ){
            score = score + 200;
            if ( ballCount>= 5){
              gameState ="end";
            }
          }        
        }
   } 

   if(gameState === "end"){
    textSize(70);
    text("Game Over", 65, 450);
   }
}

function mousePressed(){
  if(gameState === "play"){
    ballCount++;
    particle = new Particle(mouseX,10,10);
  }
}