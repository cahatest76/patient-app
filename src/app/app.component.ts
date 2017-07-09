import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { DoctorListPage } from '../pages/doctor-list/doctor-list'
import { AppointmentListPage } from '../pages/appointment-list/appointment-list'
import { SettingsPage } from '../pages/settings/settings'
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs'


export interface PageInterface {
  title: string;
  name: string;
  //component: any;
  icon: string;
  //logsOut?: boolean;
  index?: number;
  //tabName?: string;
  //tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  appPages: PageInterface[];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage
  ) {

    this.rootPage = LoginPage;
    //this.rootPage = TabsPage;
    this.appPages = [
      { title: 'Doctores', name: 'TabsPage', index: 0, icon: 'contacts' },
      { title: 'Mis citas', name: 'TabsPage', index: 1, icon: 'calendar' },
      { title: 'Configuración', name: 'SettingsPage', icon: 'construct' },
      { title: 'Tutorial', name: 'TabsPage', icon: 'help' },
      { title: 'Acerca de ...', name: 'TabsPage', icon: 'information' }
    ];

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (!hasSeenTutorial)
          this.rootPage = TutorialPage;
        this.platformReady()
      });

  }

  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  exit() {
    this.storage.set('patient', null);
    this.nav.setRoot(LoginPage);
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }
    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      //this.nav.setRoot(SettingsPage);
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }
}

