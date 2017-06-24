import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';

/**
 * Generated class for the AppointmentListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-list',
  templateUrl: 'appointment-list.html',
  providers: [MedicalProvider]
})
export class AppointmentListPage {

  public appointments: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public medicalProvider: MedicalProvider
    ) {
  }

  ionViewDidLoad() {
    console.log(this.navCtrl.getViews());

    this.medicalProvider.getAppointmentList('59449a317819bb5cb460a5d8')
      .subscribe ( 
          appointments => {
            this.appointments  = appointments;
            console.log(this.appointments);
          }
      )
  }

}
