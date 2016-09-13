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
      console.log("Create phaser game object... " + this.count)
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
  cursors: any;
  avatarSprite: any;

  A: any;
  D: any;

  preload() {
      //this.game.load.image("avatar", "img/avatar.png");
  }

  create() {
      var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
      this.textValue = this.game.add.text(0, 100, "0", style);
      this.updateCount = 0;
      this.renderCount = 0;

      var image = this.game.cache.getImage("avatar");
      console.log("game width: " + this.game.width)
      console.log("image width: " + image.width)

/*
      this.avatarSprite = this.game.add.sprite(
            this.game.width / 2 / window.devicePixelRatio - image.width / 2,
            this.game.height / 2 / window.devicePixelRatio- image.height / 2,
             "avatar");

      // create the cursor key object
      this.cursors = this.game.input.keyboard.createCursorKeys();

        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.A.onDown.add(PhaserPage.prototype.moveLeft, this);
        this.D.onDown.add(PhaserPage.prototype.moveRight, this);
*/
  }

  update() {
      this.textValue.text = (this.updateCount++).toString();

/*
      // Update input state
      this.game.input.update();

      if (this.cursors.left.isDown) {
          if (this.cursors.left.ctrlKey)
              this.avatarSprite.position.x -= 5;
          else
              this.avatarSprite.position.x--;
      }
      if (this.cursors.right.isDown) {
          if (this.cursors.right.ctrlKey)
              this.avatarSprite.position.x += 5;
          else
              this.avatarSprite.position.x++;
      }
      */
  }

/*
  moveLeft() {
      this.avatarSprite.position.add(-1, 0);
  }
  moveRight() {
      this.avatarSprite.position.add(1, 0);
  }
  */

  render() {
      this.game.debug.text("This is drawn in render(): " + (this.renderCount++).toString(), 0, 80);
  }
  /*
  goMarketing() {
    this.nav.push(GameMarketing);
  }
  */

}