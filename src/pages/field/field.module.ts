import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldPage } from './field';

@NgModule({
  declarations: [
    FieldPage,
  ],
  imports: [
    IonicPageModule.forChild(FieldPage),
  ],
  exports: [
    FieldPage
  ]
})
export class FieldPageModule {}
