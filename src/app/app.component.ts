import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DoctorListPage } from '../pages/doctor-list/doctor-list'
import { AppointmentListPage } from '../pages/appointment-list/appointment-list'
import { SettingsPage } from '../pages/settings/settings'


export interface PageInterface {
  title: string;
  name: string;
  //component: any;
  icon: string;
  logsOut?: boolean;
  //index?: number;
  //tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  appPages:PageInterface[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

  this.rootPage = HomePage;
  this.appPages = [
      { title: 'Mis citas', name: 'AppointmentListPage', icon: 'calendar' },
      { title: 'Doctores', name: 'DoctorListPage', icon: 'contacts' },
      { title: 'Configuración', name: 'SettingsPage', icon: 'construct' },
      { title: 'Tutorial', name: 'TabsPage', icon: 'help' },
      { title: 'Acerca de ...', name: 'TabsPage', icon: 'information' }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    this.nav.setRoot(page.name).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });

  }
}

