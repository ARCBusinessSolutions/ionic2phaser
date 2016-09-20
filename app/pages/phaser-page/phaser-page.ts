// Library Imports
import {Component, ViewChild} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';


declare var Phaser: any;

@Component({
  templateUrl: 'build/pages/phaser-page/phaser-page.html'
})

export class PhaserPage {

  count: number  = 0;

  constructor(
    public nav: NavController) {
//constructor
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter this.game : ",this.game);
    console.log("Create phaser game object...  " + this.count)
    console.log("device pixel ratio... " + window.devicePixelRatio)

    // create the game
      if ( !this.game ){

      this.game = new Phaser.Game(
        window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 
        Phaser.AUTO, 
        'phaserDiv', 
        { create: this.create, update: this.update, preload: this.preload }
        );

      this.count++;
      this.PlayBackgroundMusic();
      document.addEventListener('pause', ()=>this.Paused(), false);



    }
  }ionViewDidLeave() {
  //detroy all game data
   this.game.state.clearCurrentState();
   this.game.disableStep();
   this.game.destroy();
   this.game = null;
   this.my_media.stop();
  }PlayBackgroundMusic(){
// get good location
console.log("start music",this.my_media);
let path = window.location.pathname;
path = path.substr(0, path.length - 10 );
// get the file
this.my_media = new MediaPlugin(path+'audios/mario.mp3');
this.my_media.play();
  }Paused(){
    //fire this function when app is inactive
    this.my_media.stop();
  }
  game: Phaser.Game;
  Path:string="Iphone";
  Test: any;
  BG:Phaser.Sprite;
  MenuState:any;
  TSS:any;
  POS:any;
  TSLS:any;
  my_media:MediaPlugin;
  preload() {
    //check Iphone or Ipad
    if(window.innerHeight/window.innerWidth>1.6){this.Path="Iphone";}
    else {this.Path="Ipad";}
    //menu Assets
      this.game.load.image("B01", 'img/'+this.Path+'/B01.png');
      this.game.load.image("B02", 'img/'+this.Path+'/B02.png');
      this.game.load.image("B03", 'img/'+this.Path+'/B03.png');//play sound fx
      this.game.load.image("B04", 'img/'+this.Path+'/B04.png');//play sound fx
      this.game.load.image('BG', 'img/'+this.Path+'/Background.png');
      this.game.load.image("backBt", 'img/'+this.Path+'/back.png');
      //test PoUp Assets
      this.game.load.image("Cancel", 'img/'+this.Path+'/cancel.png');
      this.game.load.image("Pop", 'img/'+this.Path+'/pop.png');
      this.game.load.image("Yes", 'img/'+this.Path+'/yes.png');
      this.game.load.image("No", 'img/'+this.Path+'/no.png');
      this.game.load.image("Bt4", 'img/'+this.Path+'/bt4.png');
      //test sprite Assets
      this.game.load.image("Bt1", 'img/'+this.Path+'/bt1.png');
      this.game.load.image("Room", 'img/'+this.Path+'/Room1.png');
      this.game.load.image("Bt2", 'img/'+this.Path+'/bt2.png');
      this.game.load.image("Bt3", 'img/'+this.Path+'/bt3.png');//play sound fx
      this.game.load.atlas('spritesheet', 'img/'+this.Path+'/cake.png', 'img/'+this.Path+'/cake.json');
      //test sprite Layering Assets
       this.game.load.image("Mountain", 'img/'+this.Path+'/Mountain.png');
       this.game.load.image("Sky", 'img/'+this.Path+'/Sky.png');
       this.game.load.atlas('bird', 'img/'+this.Path+'/bird.png', 'img/'+this.Path+'/bird.json');
  }

  create() {
    //reseize world
    this.game.world.setBounds(0,0,window.innerWidth,window.innerHeight);
    // console.log("------- window.devicePixelRatio ------->",window.devicePixelRatio);
    // console.log("new game.world ",this.game.world.bounds);

     // add games states
      let M = new Menu(this.game);
      this.MenuState = M.State;

      let TS = new TestSprite(this.game);
      this.TSS = TS.State;

      let PO = new PopUp(this.game);
      this.POS = PO.State;


      let TSL = new TestSpritelayering(this.game);
      this.TSLS = TSL.State;


      this.game.state.add("Menu",this.MenuState);
      this.game.state.add("TestSprite",this.TSS);
      this.game.state.add("TestPop",this.POS);
      this.game.state.add("TestSpriteLayering",this.TSLS);

      //start the Menu
      this.game.state.start("Menu");
      

console.log(this.game.state.getCurrentState());

  }update(){
  }
}


// menu Class
class Menu {
  game:Phaser.Game;
  State:Phaser.State;
  BT1:Phaser.Button;
  BT2:Phaser.Button;
  BT3:Phaser.Button;

  BG:Phaser.Sprite;
  Title:Phaser.Text;

 textValue:Phaser.Text;
 rendertext:Phaser.Text;
  
  constructor(game:Phaser.Game){
    this.game = game;
    //create state 
    this.State = new Phaser.State();

    this.State.create = () =>{  
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
      //enable rendring FPS
      this.game.time.advancedTiming =true;
      
  }
  this.State.update = () =>{}
  this.State.render = () =>{
    this.game.debug.text( "Elapsed seconds :"+Math.round(this.game.time.totalElapsedSeconds()).toString(), 10, 100 );
    this.game.debug.text("FPS :"+ this.game.time.fps ,10,120);
}
  
  
}
  ButtonAction(bt){
if(bt==this.BT1){
this.game.state.start("TestSprite", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
}else if(bt==this.BT2){
this.game.state.start("TestPop", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
}else if(bt==this.BT3){
this.game.state.start("TestSpriteLayering", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
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
    this.game.time.advancedTiming =true;

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
    this.PopBackground.scale.set(0.5,0.5);
    //add colose button to the pop
    this.CloseBt= this.game.add.button(this.PopBackground.x+this.PopBackground.width*0.5,this.PopBackground.y-this.PopBackground.height*0.5,'Cancel',this.ClosePop,this);
    this.CloseBt.anchor.set(0.5,0.5);
    this.CloseBt.scale.set(0.5,0.5);
    //add 2 buttons yes and no
    this.YesBt= this.game.add.button(this.PopBackground.x,this.PopBackground.y-48,'Yes',this.ClosePop,this);
    this.YesBt.anchor.set(0.5,0.5);
    this.YesBt.scale.set(0.5,0.5);

    this.NoBt= this.game.add.button(this.PopBackground.x,this.PopBackground.y+48,'No',this.ClosePop,this);
    this.NoBt.anchor.set(0.5,0.5);
    this.NoBt.scale.set(0.5,0.5);
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

 this.game.time.advancedTiming =true;
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
      

       this.game.time.advancedTiming =true;
    
   

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
