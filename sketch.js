var rapunzel,rapunzelimg;
var invisibleGround;
var warriorsGroup,lanternsGroup,warriorimg,crownimg;
var life = 3;
var gameState="start";
var  startButton,startButtonImg;
var restartButton,restartButtonImg;
function preload(){
  rapunzelimg=loadImage("images/rapunzel.png");
  warriorimg=loadImage("images/warrior.png");
  crownimg=loadImage("images/Crown.jpg");
  startButtonImg=loadImage("images/playButton.jpg");
  restartButtonImg=loadImage("images/resetButton.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  rapunzel=createSprite(displayWidth/10, displayHeight-50, 50, 50);
  rapunzel.addImage(rapunzelimg);
  rapunzel.scale=0.2;
  invisibleGround=createSprite(displayWidth/2,displayHeight-20,displayWidth,20);
  invisibleGround.visible=false;
  warriorsGroup=new Group();

  lanternsGroup=new Group();
  
  startButton=createSprite(displayWidth/2,displayHeight/2);
  startButton.addImage(startButtonImg);
  restartButton=createSprite(displayWidth/2,displayHeight/2+30)
  restartButton.addImage(restartButtonImg);
  restartButton.visible=false;
  
}

function draw() {
  background(0,0,0);
  textSize(14)
  fill("white")
  text("LIVES:"+life,displayWidth-100,50)
  console.log(displayHeight)

  if(gameState==="start" && mousePressedOver(startButton)){
    startButton.visible=false;
    gameState="play";
  
  }  
  if(gameState==="play"){
  if(keyDown("space")&&rapunzel.y>=displayHeight-135){
    rapunzel.velocityY=-10;

  }
  rapunzel.velocityY=rapunzel.velocityY+0.5
  
  spawnWarriors();
  spawnLanterns();
  if(rapunzel.isTouching(warriorsGroup)){
    if(life>0){
      life=life-1;
      gameState="start"
      startButton.visible=true;
    }
    else if(life===0){
      gameState="end";
      restartButton.visible=true;
    }
    warriorsGroup.destroyEach();
    lanternsGroup.destroyEach();
  }
}
if(gameState==="end"){
  warriorsGroup.setVelocityXEach(0);
  lanternsGroup.setVelocityXEach(0);
  restartButton.visible=true;
  if(mousePressedOver(restartButton)){
    reset();
  }
}
rapunzel.collide(invisibleGround);
  drawSprites();
  
}
function spawnWarriors(){
  if(frameCount%100===0){
    var warrior=createSprite(displayWidth,displayHeight-50);
    warrior.addImage(warriorimg);
    warrior.velocityX=-6
  warriorsGroup.add(warrior)
  }
}
function spawnLanterns(){
  if(frameCount%1000===0){
    var lantern=createSprite(displayWidth,displayHeight-200);
    lantern.addImage(crownimg);
    lantern.velocityX=-6
  lanternsGroup.add(lantern)
  }
}
function reset(){
  gameState="start";
  restartButton.visible=false;
  startButton.visible=true;
}
