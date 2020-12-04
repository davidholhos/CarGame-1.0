//c = car;
//b = bus;
//g = gray;
//t = truck;

var PLAY=1;
var END=0;
var gameState = PLAY;
var road,roadImage;
var playercar,playercarImg,car1,car1Img,car2,car2Img;
var carPlayer,carPlayerimg,carPlayerimg2,carPlayerimg3;
var rightwall,leftwall;
var bench,benchimg,benchGroup;
var rock,rockimg,rockGroup;
var rightcar,rightlaneimg1,rightlaneimg2,rightlaneimg3,rightlaneimg4;
var rightcarGroup;
var leftcar, leftlaneimg1,leftlaneimg2,leftlaneimg3,leftlaneimg4;
var leftcarGroup;
var score=0;

function preload(){
  roadImage = loadImage("road_img.png");
  
  carPlayerimg = loadImage("carPlayer.png");
  carPlayerimg2 = loadImage("carright.png");
  carPlayerimg3 = loadImage("carleft.png");
  
  benchimg = loadImage("bench.png");
  
  rockimg = loadImage("rock.png");
  
  rightlaneimg1 = loadImage("rightlanec.png");
  rightlaneimg2 = loadImage("rightlaneb.png");
  rightlaneimg3 = loadImage("rightlanegc.png");
  rightlaneimg4 = loadImage("rightlanet.png");

  leftlaneimg1 = loadImage("leftlanec.png")
  leftlaneimg2 = loadImage("leftlaneb.png")
  leftlaneimg3 = loadImage("leftlanegc.png")
  leftlaneimg4 = loadImage("leftlanec.png")
}

function setup(){
  createCanvas(800,740);

  

  
  

  road = createSprite(400,350,70,800);
  road.addImage("road",roadImage);
  road.scale = 0.35;
  road.depth = 1;

  carPlayer = createSprite(450,600);
  carPlayer.addImage("redcar",carPlayerimg);
  carPlayer.addImage("right",carPlayerimg3);
  carPlayer.addImage("left",carPlayerimg2);
  carPlayer.scale = 0.2;

  rightwall = createSprite(580,400,20,820);
  rightwall.visible = false;
  leftwall = createSprite(140,400,20,820);
  leftwall.visible = false;

rightcarGroup = new Group();
leftcarGroup = new Group();
benchGroup = new Group();
rockGroup = new Group();
}

function draw(){
  //console.log(road.y);
  //carPlayer.debug = true;
  
  background(0,0,0);
  carPlayer.setCollider("rectangle",0,0,420,750);
  
  if(gameState===PLAY){
  
  road.velocityY = 19;
  score = score + Math.round(getFrameRate()/60);
  
  
  if(road.y>617){
    road.y=130;
  }


  carPlayer.collide(leftwall);
  carPlayer.collide(rightwall);
  
  textSize(20);
  fill("red");
  
  text("Score: "+ score, 650,50)


  if(keyDown("right_arrow")){
    carPlayer.x+=7;
    carPlayer.changeImage("right",carPlayerimg3);
  }
  else{
    carPlayer.changeImage("redcar",carPlayerimg);
  }
  if(keyDown("left_arrow")){
    carPlayer.x-=7;
    carPlayer.changeImage("left",carPlayerimg2);
  }
  
  
  if(carPlayer.isTouching(rightcarGroup) || carPlayer.isTouching(leftcarGroup)){
    
    rightcarGroup.setVelocityYEach(0);
        leftcarGroup.setVelocityYEach(0);
        rightcarGroup.setLifetimeEach(-1);
        leftcarGroup.setLifetimeEach(-1);
        road.velocityY=0;
        benchGroup.setVelocityYEach(0);
        rockGroup.setVelocityYEach(0);
        benchGroup.setLifetimeEach(-1);
        rockGroup.setLifetimeEach(-1);
        gameState = END;

        

  }

  benches();
  rocks();
  rightlane();
  leftlane();

  }

  if(gameState === END && keyDown("space")){

    reset();
    
  }





  



  
  drawSprites();
}
function benches(){

  if(frameCount % 150==0){
    bench = createSprite(730,-10,20,20);
    bench.scale = 0.15;
    bench.addImage("bench",benchimg);
    bench.velocityY=17;
    bench.lifetime = 130;
    benchGroup.add(bench);
  }

}

function rocks(){
  if(frameCount % 130 == 0){
    rock = createSprite(780,-10);
    rock.scale = 0.05;
    rock.x = Math.round(random(760,790));
    rock.addImage("rock",rockimg);
    rock.velocityY=18;
    rock.lifetime = 130;
    rockGroup.add(rock);
  }
  
}

function rightlane(){
  if(frameCount % 180 == 0){
    rightcar = createSprite(470,-100);
    rightcar.velocityY = 8;

    var rand = Math.round(random(1,4));
    switch(rand) {

      case 1: rightcar.addImage(rightlaneimg1);
              break;
      case 2: rightcar.addImage(rightlaneimg2);
              break;
      case 3: rightcar.addImage(rightlaneimg3);
              break;
      case 4: rightcar.addImage(rightlaneimg4);
              break;
      default: break;
    }        
    rightcar.scale = 0.2;
    rightcarGroup.add(rightcar);
    rightcar.lifetime = 130;
    }

  }

  function leftlane(){
    if(frameCount % 280 == 0){
      leftcar = createSprite(230,-100);
      leftcar.velocityY = Math.round(random(18,25));
  
      var i = Math.round(random(1,4));
      switch(i) {
  
        case 1: leftcar.addImage(leftlaneimg1);
                break;
        case 2: leftcar.addImage(leftlaneimg2);
                break;
        case 3: leftcar.addImage(leftlaneimg3);
                break;
        case 4: leftcar.addImage(leftlaneimg4);
                break;
        default: break;
      }        
      leftcar.scale = 0.2;
      leftcarGroup.add(leftcar);
      leftcar.lifetime = 130;
      }
  
    }

    function reset(){
      
  
  
  
  rightcarGroup.destroyEach();
  leftcarGroup.destroyEach();
  benchGroup.destroyEach();
  rockGroup.destroyEach();
  
  gameState = PLAY;
  
  
  
  score = 0;
  
}
      
      
    


