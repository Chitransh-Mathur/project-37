var bg,bgImg,player, player_running;


var foodGroup, obstaclesGroup;
var bananaImage, obstacleImg,invground;
var index=[];

var score=0;


function preload(){
  bgImg=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(0,0,800,800);
  bg.addImage(bgImg);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  invground = createSprite(400,350,800,10);
  invground.velocityX=-4;
  invground.x=invground.width/2;
  invground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

camera.position.x=player.x;
camera.position.x=obstaclesGroup.x;
camera.position.x=foodGroup.x;


}

function draw() {
  
  background(255);
  
  
  if(bg.x<100){
   bg.x=bg.width/2;
  }
  if(invground.x<0) {
    invground.x=invground.width/2;
  }
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
    score = score + 5;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(invground);
    spawnBanana();
    spawnObstacle();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.05;
  
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnBanana() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImg);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
