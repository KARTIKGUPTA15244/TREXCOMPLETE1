var trex,trex_running,trex_collided;
var ground,ground_image,invisible_ground;
var obstaclesGroup,cloudsGroup;
var rand,rand1;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloud;
var PLAY =1;
var END =2;
var gameState = PLAY;
var gameOver;
var restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
trex_collided = loadImage("trex_collided.png");  

  ground_image = loadImage("ground2.png");
  cloud_Image = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 400);
  score = 0
  trex = createSprite(100,330,50,50);
trex.addAnimation("running",trex_running) ;
  trex.addImage("collidedtrex", trex_collided)
  

  
  trex.scale = 0.5;

  ground = createSprite(300,360,600,10);
  ground.addImage("img",ground_image);
  ground.x = ground.width/2;
ground.velocityX = -(6 + 3*score/100);

  restart = createSprite(300,200,50,50);
  restart.addImage("startagain",restartImage);
  restart.visible = false;
 

  gameOver = createSprite(290,250,50,50);
 gameOver.addImage("over",gameOverImage);
  gameOver.visible = false;

  rand = random(120,360);
  rand1 = random(1,6);

  

  invisible_ground = createSprite(300,365,600,10);
  invisible_ground.visible  = false;

obstaclesGroup = new Group();

cloudsGroup = new Group();
}

function draw() {
  //created a background
  background(255,255,255);
ground.velocityX = -5;
  text("score:-"+score,450,50);
  
  if(gameState===PLAY){
  // trex.setAnimation("trex_collided");
  rand = random(220,300);
  rand1 = Math.round(random(1,6));
score =score + Math.round(World.frameRate/60);
   //made trex to jump
  if(keyDown("space") && trex.y>325){
    trex.velocityY = -10;
      }
    if(keyDown("UP_ARROW") && trex.y>325){
    trex.velocityY = -10;
      }
    //added gravity
  trex.velocityY = trex.velocityY+0.5;
      


  //trex walk on the ground
  trex.collide(invisible_ground);

//infinite ground
if(ground.x<0){
  ground.x = ground.width/2;
  }
 
  if(trex.isTouching(obstaclesGroup)){
gameState=END;

  }

  spawnclouds();
  spawnObstacles();
  }

  if(gameState===END){
  
trex.changeAnimation("collidedtrex", trex_collided);
trex.velocityX = 0;
trex.velocityY = 0;

restart.visible = true;
gameOver.visible = true;
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
 obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      gameState = PLAY;
      restart.visible = false;
gameOver.visible =false;
      trex.changeAnimation("running",trex_running)
     obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      score = 0;
    }
  }

  

  drawSprites();
 
}
function spawnclouds(){
if (frameCount % 60 === 0) {
  var cloud = createSprite(600,320,40,10);
  cloud.y = rand;
  cloud.addImage(cloud_Image);
  cloud.scale = 0.5;
  cloud.velocityX = -3;

   //assign lifetime to the variable
  cloud.lifetime = 194;
  cloudsGroup.add(cloud);
}
}

function spawnObstacles(){
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.velocityX = -5;
    rand1 = Math.round(random(1,6));
    switch(rand1){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      
      
          }

    
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 230;
    
    obstaclesGroup.add(obstacle);

    
  }


}