import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorSelectionPage } from './doctor-selection';

@NgModule({
  declarations: [
    DoctorSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorSelectionPage),
  ],
  exports: [
    DoctorSelectionPage
  ]
})
export class DoctorSelectionPageModule {}
