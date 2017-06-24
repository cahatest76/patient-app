import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableTimesPage } from './available-times';

@NgModule({
  declarations: [
    AvailableTimesPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableTimesPage),
  ],
  exports: [
    AvailableTimesPage
  ]
})
export class AvailableTimesPageModule {}
