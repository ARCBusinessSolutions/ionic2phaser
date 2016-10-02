// Library Imports
import {Component, ViewChild} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';




var GameReference:any;//detroy when you quit the page

//create only one instance
var soundFx:Media;
var my_media:Media;
//flag to check if background music is active
var runningMedia:boolean=false;
declare var Phaser: any;

@Component({
  templateUrl: 'build/pages/phaser-page/phaser-page.html'
})






//page constructor and game creation
export class PhaserPage {

  constructor(
    public nav: NavController) {
//constructor
  }

  ionViewDidEnter() {
    console.log("device pixel ratio... " + window.devicePixelRatio)
    console.log("screen sizes",window.innerWidth,window.innerHeight);
    //calculate the good size of the canvas
    let FH = 0;
    let FW = 0;
    let ratio = 320/568;
    //scale the gme world with ratio
    if(window.innerWidth >= window.innerHeight){
    FH = window.innerHeight;
    FW = ratio*FH;
    }
    if(window.innerHeight>window.innerWidth){
    FW = window.innerWidth;
    FH = FW/ratio;
    }
    if(FW>window.innerWidth){
      FW = window.innerWidth;
      FH = FW/ratio;
    }
    if(FH>window.innerHeight){
      FH = window.innerHeight;
      FW = ratio*FH;
    }
   // console.log("result",FW,FH)


    //destroy old game instance if exit
  if(GameReference){
    GameReference.destroy();
  }
     // create the new game instance
      this.game = new Phaser.Game(
       FW, FH, 
        Phaser.AUTO, 
        'phaserDiv', 
        { create: this.create, update: this.update, preload: this.preload }
        );

      //add cordova litener for active/inactive state
      document.addEventListener('pause', ()=>this.Paused(), false);
      document.addEventListener("resume", ()=>this.onResume(), false);

  }ionViewWillLeave() {

    console.log("leaving page");

     if(runningMedia){
      //stop any running music
  if(!this.game.device.desktop){
        my_media.stop();
  }else{
        this.game.sound.removeByKey("mario");
  }
   runningMedia=false;     
       
  }

  }Paused(){
    //fire this function when app is inactive
    if(runningMedia){ my_media.pause();}
  }onResume(){
    //fire this function when app is active
      if(runningMedia){ my_media.play();}
  }
  game: Phaser.Game;
  Test: any;
  BG:Phaser.Sprite;
  TSO:TestSound;//test sound class

  // states
  MenuState:any;
  TSS:any;//test sprite state
  POS:any;//PopUp state
  TSLS:any;//test sprite layer state
  TSOS:any;//test sounds state
  PZS:any;//test pann/zoom state

  preload() {
   //plce the game in the center of the sreen
   this.game.scale.pageAlignHorizontally = true;
   this.game.scale.pageAlignVertically = true;
   this.game.scale.refresh();
  }
  create() {
      //enable rendring FPS
      this.game.time.advancedTiming =true;
     // add games states
      let M = new Menu(this.game);
      this.MenuState = M.State;
      let TS = new TestSprite(this.game);
      this.TSS = TS.State;
      let PO = new PopUp(this.game);
      this.POS = PO.State;
      let TSL = new TestSpritelayering(this.game);
      this.TSLS = TSL.State;
 
      this.TSO = new TestSound(this.game);
      this.TSOS = this.TSO.State;


     

      this.game.state.add("Menu",this.MenuState);
      this.game.state.add("TestSprite",this.TSS);
      this.game.state.add("TestPop",this.POS);
      this.game.state.add("TestSpriteLayering",this.TSLS);
      this.game.state.add("TestSound",this.TSOS);
     
      
      GameReference = this.game;
      //start the Menu
      this.game.state.start("Menu");
  }update(){}
}






// menu Class
class Menu {
  game:Phaser.Game;
  State:Phaser.State;
  BT1:Phaser.Button;
  BT2:Phaser.Button;
  BT3:Phaser.Button;
  BT4:Phaser.Button;
  BG:Phaser.Sprite;
  Title:Phaser.Text;
 textValue:Phaser.Text;
 rendertext:Phaser.Text;

  constructor(game:Phaser.Game){
    this.game = game;
    //create state 
    this.State = new Phaser.State();
    this.State.preload = () =>{
 
      this.game.load.image("B01", 'img/B01.png');
      this.game.load.image("B02", 'img/B02.png');
      this.game.load.image("B03", 'img/B03.png');//test sound
      this.game.load.image("B04", 'img/B04.png');
      this.game.load.image('BG', 'img/Background.jpg');
      this.game.load.image("backBt", 'img/back.png');
    }
    this.State.create = () =>{  

      if(runningMedia){
      //stop any running music
  if(!this.game.device.desktop){
        my_media.stop();
  }else{
        this.game.sound.removeByKey("mario");
  }
   runningMedia=false;       
  }

      //add image background ( fit the screen)
      this.BG = this.game.add.sprite(0,0,'BG');
      this.BG.width = this.game.world.bounds.width;
      this.BG.height =this.game.world.bounds.height;
      // title text
      let style = { font: String(15*window.devicePixelRatio)+"px Arial", fill: "#ffffff",  boundsAlignH: "center", boundsAlignV: "middle" };
      this.Title = this.game.add.text(0, 0, "The Menu", style);
      this.Title.setTextBounds(0, 0, this.game.world.bounds.width, 180);

      //add controls buttons
      //test sprite animation and movment
      this.BT1 = this.game.add.button(this.game.world.centerX,this.game.world.height*0.25,'B01',this.ButtonAction,this);
      this.BT1.anchor.set(0.5,0.5);
      //test popUp dialog with button sound
      this.BT2 = this.game.add.button(this.game.world.centerX,this.game.world.height*0.375,'B02',this.ButtonAction,this);
      this.BT2.anchor.set(0.5,0.5);

      //test sprite layering
      this.BT3 = this.game.add.button(this.game.world.centerX,this.game.world.height*0.5,'B04',this.ButtonAction,this);
      this.BT3.anchor.set(0.5,0.5);

      //test sprite layering
      this.BT4 = this.game.add.button(this.game.world.centerX,this.game.world.height*0.625,'B03',this.ButtonAction,this);
      this.BT4.anchor.set(0.5,0.5);
     
   
  }
  this.State.update = () =>{}
  this.State.render = () =>{
  this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
   this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
}
  
  
}
  ButtonAction(bt){
if(bt==this.BT1){
//this.game.state.start("TestSprite");
this.game.state.start("TestSprite", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
}else if(bt==this.BT2){
  this.game.state.start("TestPop", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
//this.game.state.start("TestPop");
}else if(bt==this.BT3){
  this.game.state.start("TestSpriteLayering", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
//this.game.state.start("TestSpriteLayering");
}else if(bt==this.BT4){
  this.game.state.start("TestSound", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
//this.game.state.start("TestSound");
}

  }
}




// TestSprite Class
class TestSprite {
  game:Phaser.Game;
  State:Phaser.State;
  BT1:Phaser.Button;
  BT2:Phaser.Button;
  BG:Phaser.Sprite;
  SP:Phaser.Sprite;
  Stopping:boolean;
  backBt:Phaser.Button;

  constructor(game:Phaser.Game){
    this.game = game;
    //create state 
    this.State = new Phaser.State();
 this.State.preload = () =>{
     this.game.load.image("Bt1", 'img/bt1.png');
      this.game.load.image("Room", 'img/Room1.jpg');
      this.game.load.image("Bt2", 'img/bt2.png');
      this.game.load.atlas('spritesheet', 'img/cake.png', 'img/cake.json');
 }
    this.State.create = () =>{  
      //add image background ( fit the screen)
      this.BG = this.game.add.sprite(0,0,'Room');
      this.BG.width = this.game.world.bounds.width;
      this.BG.height =this.game.world.bounds.height;

      //add controls buttons
      //animation
      this.BT1 = this.game.add.button(this.game.world.width-10,this.game.world.height*2/10,'Bt1',this.Toggleanimation,this);
      this.BT1.anchor.set(1,0.5);
      //movment
      this.BT2 = this.game.add.button(this.game.world.width-10,this.game.world.height*2.75/10,'Bt2',this.ToggleMovment,this);
      this.BT2.anchor.set(1,0.5);
      // back to menu button
      this.backBt= this.game.add.button(this.game.world.width-10,55,'backBt',this.BackToMenu,this);
      this.backBt.anchor.set(1,0);
      //add a sprite
    this.SP = this.game.add.sprite(this.game.world.bounds.width,this.game.world.centerY,'spritesheet');
    this.SP.anchor.set(0.5,0.5);
    //add animation
    this.SP.animations.add('anim');
    this.SP.animations.play('anim',3,true);
    // sprite will move 
    this.Stopping = false;

  };
  this.State.update = () =>{if(!this.Stopping){this.Move();}  }
  this.State.render = () =>{
    this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
    this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
}
}
   Toggleanimation(){
  //console.log(this.SP.animations.currentFrame.name);
    if (!this.SP.animations.paused){
    this.SP.animations.paused = true;
    }else{
    this.SP.animations.paused = false;
    }
  }
 //translate the sprite from right to left
    Move(){
      this.SP.x -= 5;
    if(this.SP.x < -this.SP.width/2){
      this.SP.x = this.game.world.bounds.width ;
    }
  }
  ToggleMovment(){
    this.Stopping = !this.Stopping;
  }BackToMenu(){
    this.game.state.start("Menu", Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
   
    
  }
  
}




// PopUp Class
class PopUp {
  game:Phaser.Game;
  State:Phaser.State;
  BT1:Phaser.Button;
  CloseBt:Phaser.Button;
  YesBt:Phaser.Button;
  NoBt:Phaser.Button;
  BG:Phaser.Sprite;
  PopBackground:Phaser.Sprite;
  PopContainer:Phaser.Group;
  backBt:Phaser.Button;

  constructor(game:Phaser.Game){
    this.game = game;
    //create state 
    this.State = new Phaser.State();
    this.State.preload = () =>{
      this.game.load.image("Cancel", 'img/cancel.png');
      this.game.load.image("Pop", 'img/pop.png');
      this.game.load.image("Yes", 'img/yes.png');
      this.game.load.image("No", 'img/no.png');
      this.game.load.image("Bt4", 'img/bt4.png');
 }
    this.State.create = () =>{  
      //add image background ( fit the screen)
      this.BG = this.game.add.sprite(0,0,'BG');
      this.BG.width = this.game.world.bounds.width;
      this.BG.height =this.game.world.bounds.height;

      //add controls buttons
      //button show pop
      this.BT1 = this.game.add.button(10,this.game.world.height-10,'Bt4',this.ShowPop,this);
      this.BT1.anchor.set(0,1);

      //addgroup Container
    this.PopContainer = this.game.add.group();

      //add a sprite background
    this.PopBackground = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'Pop');
    this.PopBackground.anchor.set(0.5,0.5);

    //add colose button to the pop
    this.CloseBt= this.game.add.button(this.PopBackground.x+this.PopBackground.width*0.5,this.PopBackground.y-this.PopBackground.height*0.5,'Cancel',this.ClosePop,this);
    this.CloseBt.anchor.set(0.5,0.5);

    //add 2 buttons yes and no
    this.YesBt= this.game.add.button(this.PopBackground.x,this.PopBackground.y-48,'Yes',this.ClosePop,this);
    this.YesBt.anchor.set(0.5,0.5);

    this.NoBt= this.game.add.button(this.PopBackground.x,this.PopBackground.y+48,'No',this.ClosePop,this);
    this.NoBt.anchor.set(0.5,0.5);

//add all element to the popUp
this.PopContainer.add(this.PopBackground);
this.PopContainer.add(this.CloseBt);
this.PopContainer.add(this.YesBt);
this.PopContainer.add(this.NoBt);
//Hide PopUp
this.PopContainer.visible = false;


// back to menu button
      this.backBt= this.game.add.button(this.game.world.width-10,55,'backBt',this.BackToMenu,this);
      this.backBt.anchor.set(1,0);
  };
  this.State.update = () =>{ }
  this.State.render = () =>{
    this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
    this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
}
}
   ShowPop(){
  this.PopContainer.visible = true;
  }
  ClosePop(){
   this.PopContainer.visible = false;
  }BackToMenu(){
   this.game.state.start("Menu", Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
  }
  
}




// sprite layering, background/foreground// TestSprite Class
class TestSpritelayering {
  game:Phaser.Game;
  State:Phaser.State;
  background:Phaser.Sprite;
  foreground:Phaser.Sprite;
  SP:Phaser.Sprite;
  backBt:Phaser.Button;

  constructor(game:Phaser.Game){
    this.game = game;
    //create state 
    this.State = new Phaser.State();

this.State.preload = () =>{ 
 this.game.load.image("Mountain", 'img/Mountain.jpg');
       this.game.load.image("Sky", 'img/Sky.png');
       this.game.load.atlas('bird', 'img/bird.png', 'img/bird.json');
}

    this.State.create = () =>{  

      //add image background ( fit the screen)
      this.background = this.game.add.sprite(0,0,'Mountain');
      this.background.width = this.game.world.bounds.width;
      this.background.height =this.game.world.bounds.height;

      //add spritevanimation
     this.SP = this.game.add.sprite(this.game.world.bounds.width,this.game.world.height*0.63,'bird');
     this.SP.anchor.set(0.5,0.5);
     this.SP.animations.add('anim');
     this.SP.animations.play('anim',12,true);

      //add image foreground ( fit the screen)
      this.foreground = this.game.add.sprite(0,0,'Sky');
      this.foreground.width = this.game.world.bounds.width;
      this.foreground.height =this.game.world.bounds.height;

      // back to menu button
      this.backBt= this.game.add.button(this.game.world.width-10,55,'backBt',this.BackToMenu,this);
      this.backBt.anchor.set(1,0);
  };
  this.State.update = () =>{ 
    this.SP.x -= 5;
    if(this.SP.x < -this.SP.width/2){
      this.SP.x = this.game.world.bounds.width ;
    }}
    this.State.render = () =>{
    this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
    this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
}
}
  BackToMenu(){
  this.game.state.start("Menu", Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
  }
  
}





// Test Sound Class using both cordova media and Phaser sound
class TestSound {
  game:Phaser.Game;
  State:Phaser.State;
  background:Phaser.Sprite;
  backBt:Phaser.Button;
  BT1:Phaser.Button;
  BT2:Phaser.Button;
  Title:Phaser.Text;
  Sfx:Phaser.Sound;
  music:Phaser.Sound;
  constructor(game:Phaser.Game){
    this.game = game;

    //create state 
    this.State = new Phaser.State();

   this.State.preload = () =>{ 
       this.game.load.image("bt3", 'img/bt3.png');
       this.game.load.image("bt5", 'img/bt5.png');
       
        if(this.game.device.desktop){
          this.game.load.audio('mario','audios/mario.mp3');
          this.game.load.audio('coin','audios/coin.mp3');
        }
}

    this.State.create = () =>{  

      //add image background ( fit the screen)
      this.background = this.game.add.sprite(0,0,'BG');
      this.background.width = this.game.world.bounds.width;
      this.background.height =this.game.world.bounds.height;

      let style = { font: String(15*window.devicePixelRatio)+"px Arial", fill: "#ffffff",  boundsAlignH: "center", boundsAlignV: "middle" };
      this.Title = this.game.add.text(0, 0, "The audio", style);
      this.Title.setTextBounds(0, 0, this.game.world.bounds.width, 180);

      // button play single sound
      this.BT1= this.game.add.button(this.game.world.centerX,this.game.world.centerY-50,'bt3',this.PlayFX,this);
      this.BT1.anchor.set(0.5,0.5);
      // button play background music
      this.BT2= this.game.add.button(this.game.world.centerX,this.game.world.centerY+50,'bt5',this.ToggleMusic,this);
      this.BT2.anchor.set(0.5,0.5);
    
       if(this.game.device.desktop){
         this.music = this.game.add.audio('mario');
         this.Sfx = this.game.add.audio('coin');
      }

      // back to menu button
      this.backBt= this.game.add.button(this.game.world.width-10,55,'backBt',this.BackToMenu,this);
      this.backBt.anchor.set(1,0);
  };
  this.State.update = () =>{}
    this.State.render = () =>{
    this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
    this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
};
}
  BackToMenu(){
  this.game.state.start("Menu", Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.In.SlideRight);
  }PlayFX(){

if(!this.game.device.desktop){

 if(!soundFx){
        let path = window.location.pathname;
        path = path.substr(0, path.length - 10 );
        // get the file
         soundFx = new Media(path+'audios/coin.mp3',
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        });
 }
 soundFx.play();
 
}else{ this.Sfx.play("",0,1,false);}

  }ToggleMusic(){
    this.Title.text = "start BG music";
    if(!this.game.device.desktop){

       if(!my_media){
         // get good location
        let path = window.location.pathname;
        path = path.substr(0, path.length - 10 );
        // get the file
          my_media = new Media(path+'audios/mario.mp3',
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
        );
          }

    if(runningMedia == false){
   
    my_media.play({ numberOfLoops: 100 });
    runningMedia = true;

    }else{

     my_media.pause();
     runningMedia = false;

    }

    }else{

      console.log("runningMedia ",runningMedia);
      if(runningMedia == false){

    if(this.music.paused){

      this.music.resume();
      
      }else{

         this.music.play("",0,1,true);

        }

        runningMedia = true;

      }else{
      this.music.pause();
      runningMedia = false;

    }


    }
  }
  
}





