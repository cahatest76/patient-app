import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { AppointmentPage } from '../appointment/appointment'
import { Storage } from '@ionic/storage';

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
  public patientId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicalProvider: MedicalProvider,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('patient.id')
      .then(patientId => {
        this.patientId = patientId;

        this.medicalProvider.getAppointmentList(this.patientId)
          .subscribe(
            appointments => {
              this.appointments = appointments;
            }
          )
      })
  }

  goToAddAppointment() {
    this.navCtrl.push(AppointmentPage);
  }

  goToAppointment (appointment) {
      this.navCtrl.push(AppointmentPage, { 
        "appointment": appointment
      });
  }

}
