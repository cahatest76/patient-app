import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ReactiveFormsModule }  from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoctorPage } from '../pages/doctor/doctor'
import { AppointmentPage } from '../pages/appointment/appointment'
import { AvailableTimesPage } from '../pages/available-times/available-times';
import { ServiceTypePage } from '../pages/service-type/service-type'
import { TutorialPage } from '../pages/tutorial/tutorial'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'
import { LandingPage } from '../pages/landing/landing'
//import { DoctorListPage } from '../pages/doctor-list/doctor-list'
//import { AppointmentListPage } from '../pages/appointment-list/appointment-list'
import { DoctorInvitationPage } from '../pages/doctor-invitation/doctor-invitation'
import { DoctorSelectionPage } from '../pages/doctor-selection/doctor-selection'
import { MedicalProvider } from '../providers/medical/medical';

import { AppointmentListPageModule } from '../pages/appointment-list/appointment-list.module'
import { DoctorListPageModule } from '../pages/doctor-list/doctor-list.module'
import { TabsPageModule } from '../pages/tabs/tabs.module'

//import { TabsPage } from '../pages/tabs/tabs'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DoctorPage,
    AppointmentPage,
    AvailableTimesPage,
    ServiceTypePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    LandingPage,
    //DoctorListPage,
    DoctorInvitationPage,
    DoctorSelectionPage,
    //TabsPage
    //AppointmentListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    TabsPageModule,
    AppointmentListPageModule,
    DoctorListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DoctorPage,
    AppointmentPage,
    AvailableTimesPage,
    ServiceTypePage,
    TutorialPage,
    LoginPage,
    RegisterPage,
    LandingPage,
    //DoctorListPage,
    DoctorInvitationPage,
    DoctorSelectionPage,
    //TabsPage
    //AppointmentListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MedicalProvider
  ]
})
export class AppModule {}
