
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentListPage } from './appointment-list';

@NgModule({
  declarations: [
    AppointmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentListPage),
  ],
  exports: [
    AppointmentListPage
  ]
})
export class AppointmentListPageModule {}

