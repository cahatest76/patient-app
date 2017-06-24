import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoctorPage } from '../pages/doctor/doctor'
import { AppointmentPage } from '../pages/appointment/appointment'
import { AvailableTimesPage } from '../pages/available-times/available-times';
import { ServiceTypePage } from '../pages/service-type/service-type'

import { MedicalProvider } from '../providers/medical/medical';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DoctorPage,
    AppointmentPage,
    AvailableTimesPage,
    ServiceTypePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DoctorPage,
    AppointmentPage,
    AvailableTimesPage,
    ServiceTypePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MedicalProvider
  ]
})
export class AppModule {}
