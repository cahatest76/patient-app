import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceTypePage } from './service-type';

@NgModule({
  declarations: [
    ServiceTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceTypePage),
  ],
  exports: [
    ServiceTypePage
  ]
})
export class ServiceTypePageModule {}
