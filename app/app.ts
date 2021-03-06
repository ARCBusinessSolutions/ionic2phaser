import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import {PhaserPage} from './pages/phaser-page/phaser-page';

var CurrentPageTitle: string;

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 },
      { title: 'Phaser', component: PhaserPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();


      // Debug so we know if we are using the accelerated view or not 
      if (window.indexedDB) {
        console.log('I\'m in WKWebView!');
      } else {
        console.log('I\'m in UIWebView');
      }


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // dont kill phaser if user click menu , but only when leave the page
    if (CurrentPageTitle === 'Phaser' && page.title === 'Phaser') { return; }
    CurrentPageTitle = page.title;


    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
