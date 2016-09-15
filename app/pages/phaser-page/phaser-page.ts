// Library Imports
import {Component, ViewChild} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';

declare var Phaser: any;

@Component({
  templateUrl: 'build/pages/phaser-page/phaser-page.html'
})

export class PhaserPage {

  count: number  = 0;

  constructor(
    public nav: NavController) {

    if ( !this.game ){
      console.log("Create phaser game object...  " + this.count)
      console.log("device pixel ratio... " + window.devicePixelRatio)
      //canvasElement = angular.element(document.querySelector('#tempCanvas'));
      this.game = new Phaser.Game(
        window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, 
        Phaser.AUTO, 
        'phaserDiv', 
        { create: this.create, update: this.update, render: this.render, preload: this.preload });
      this.count++;
    }
  }

  ionViewWillEnter() {
    console.log("Runs when the page is about to enter and become the active page.");
    console.log("Find all lifecycle events here (about half way down page): http://ionicframework.com/docs/v2/api/components/nav/NavController/")
  }

  game: Phaser.Game;
  textValue: any;
  updateCount: number;
  renderCount: number;
  Test: any;
  preload() {
      this.game.load.image("avatar", "img/avatar.png");
      this.game.load.image("Bt1", "img/bt1.png");
      this.game.load.image("Bt2", "img/bt2.png");
      this.game.load.atlas('spritesheet', 'img/cake.png', 'img/cake.json');
  }

  create() {
      var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
      this.textValue = this.game.add.text(0, 100, "0", style);
      this.updateCount = 0;
      this.renderCount = 0;

    this.Test = new testsprite(this.game);
     

  }

  update() {
      this.textValue.text = (this.updateCount++).toString();
      if(this.Test){this.Test.update();}

  }

  

  render() {
      this.game.debug.text("This is drawn in render(): " + (this.renderCount++).toString(), 0, 80);
  }
  

}






class testsprite {
  game:Phaser.Game;
  SP:Phaser.Sprite;
  Stopping:boolean;
  ToggleAnmation:Function;
  BT1:Phaser.Button;
  BT2:Phaser.Button;
  text:Phaser.Text;
  constructor(game:Phaser.Game){
    this.game = game;
    //add a sprite
    this.SP = this.game.add.sprite(this.game.world.bounds.width,this.game.world.centerY,'spritesheet');
    this.SP.anchor.set(0.5,0.5);
    //add animation
    this.SP.animations.add('anim');
    this.SP.animations.play('anim',3,true);
     
// sprite can move by default
this.Stopping = false;
//add controls buttons
this.BT1 = this.game.add.button(300,200,'Bt1',this.Toggleanimation,this);
this.BT2 = this.game.add.button(500,200,'Bt2',this.ToggleMovment,this);

//adding text
  var style = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  this.text = this.game.add.text(400, 100, "Test Sprite", style);

  }

  ToggleMovment(){
  this.Stopping = !this.Stopping;
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

  update(){
    if(!this.Stopping){this.Move();}
  }


//end of the testsprite class
}





//Notes

// create a group to hold the test class
