import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorInvitationPage } from './doctor-invitation';

@NgModule({
  declarations: [
    DoctorInvitationPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorInvitationPage),
  ],
  exports: [
    DoctorInvitationPage
  ]
})
export class DoctorInvitationPageModule {}
