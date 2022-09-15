var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg
var heart1,heart2,heart3
var heart1Img, heart2Img, heart3Img;
var bullet;
var life=3;
var bullets=70;
var gameState = "play"
var score = 0;
var deadplayer
var loose,winning,explode


function preload(){
 heart1Img = loadImage("assets/heart_1.png")
 heart2Img = loadImage("assets/heart_2.png")
 heart3Img = loadImage("assets/heart_3.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  deadplayer = loadImage("assets/zombiecharacter.jpg")

loose = loadSound("assets/lose.mp3")
winning = loadSound("assets/win.mp3")
explode = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
 


  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage("playing",shooterImg)
 player.addImage("dead",deadplayer)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false;
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4;

   heart2 = createSprite(displayWidth-150,40,20,20)
   heart2.visible = false;
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4;

   heart3 = createSprite(displayWidth-150,40,20,20)
  
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4;

   zombieGroup = new Group()
   bulletGroup = new Group()

   

}

function draw() {
  background(0); 

if(gameState === "play"){
  if(life === 3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false

  }
 if(life === 2){
  heart1.visible = false
  heart2.visible = true
  heart3.visible = false
 }
 
 if(life === 1){
heart1.visible =  true
heart2.visible =  false
heart3.visible =  false


 }
 if( life === 0){
  heart1.visible = false
  gameState = "lost"
 }

if( score === 100){
  gameState = "win"
}



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&& player.y>= 250||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(keyDown("left_ARROW")||touches.length>0){
player.x = player.x-10
}

if(keyDown("right_ARROW")||touches.length>0){
  player.x = player.x+10
  }
  

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.velocityX = 20
 bulletGroup.add(bullet)
 bullets = bullets-1

  player.addImage(shooter_shooting)
  explode.play()

  player.depth = bullet.depth
  player.depth = player.depth+2
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
} 
if(bullets == 0){
  gameState = "bullets"
}


// destroy the zombiewhen bullets touches it and increase score
if(zombieGroup.isTouching(bulletGroup)){
  
  for(var i=0;i<zombieGroup.length;i++){
   if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score = score+2
   }
  }
}






 if(zombieGroup.isTouching(player)){
 for(var i=0;i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
  life = life-1
}
 }
 

 
 
 }

anime()
}
drawSprites();
 
textSize(20)
fill ("white")
text ("Bullets = "+bullets,displayWidth-210,displayHeight/2-250)
text ("Score = "+score,displayWidth-200,displayHeight/2-220)
text ("Lives = "+life,displayWidth-200,displayHeight/2-280)

if(gameState === "lost"){
  fill("red")
  textSize (150)
  text ("You Lost",400,300)
  zombieGroup.destroyEach()
  player.changeAnimation("dead",deadplayer)
  loose.play()

}
else if(gameState === "win"){
  textSize (150)
  fill ("yellow")
  text ("YOU WIN",400,400)
  winning.play()
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState === "bullets"){
  textSize (50)
  fill ("yellow")
  text ("YOU RAN OUT OF BULLETS",470,410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()

}


}


function anime(){

  if(frameCount%50===0){
    zombie = createSprite(random(500,1200),random(350,450),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX = -3
    zombie.debug = true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 400
    zombieGroup.add(zombie)  
  }
}

