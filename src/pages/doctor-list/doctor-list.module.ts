import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorListPage } from './doctor-list';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DoctorListPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorListPage),
    CommonModule
  ],
  exports: [
    DoctorListPage
  ]
})
export class DoctorListPageModule {}
