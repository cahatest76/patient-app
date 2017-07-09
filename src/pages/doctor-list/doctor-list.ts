import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DoctorPage } from '../doctor/doctor'
import { AppointmentPage } from '../appointment/appointment'
import { DoctorInvitationPage } from '../doctor-invitation/doctor-invitation'

import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DoctorListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor-list',
  templateUrl: 'doctor-list.html',
  providers: [MedicalProvider]
})
export class DoctorListPage {

  public doctors: any;
  public patientId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicalProvider: MedicalProvider,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {

    this.doctors = [];

  }

  ngOnInit() {
    this.storage.get('patient')
      .then(patient => {
        this.patientId = patient.id;

        this.medicalProvider.getDoctorList(this.patientId)
          .subscribe(
          doctors => {
            this.doctors = doctors;
            console.log(this.doctors);
          }
          )
      })

    /*
    this.doctorProvider.getList().subscribe(listado => {
        console.log(listado);
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorListPage');
  }

  /*
    goToDoctor(doctor) {
      console.log(this.navCtrl.getViews());
      this.navCtrl.push(DoctorPage, { doctor: doctor });
    }
  */
  goToDoctor(doctor) {
    let modal = this.modalCtrl.create(DoctorPage, {
      doctor: doctor
    });
    modal.present();
  }
  /*
    goToAddDoctor(){
      this.navCtrl.push(DoctorInvitationPage);
    }
    */

  goToAddDoctor(doctor) {
    let modal = this.modalCtrl.create(DoctorInvitationPage, {
    });
    modal.present();
  }

  goToSchedule(doctor) {
    let modal = this.modalCtrl.create(AppointmentPage, {
      doctor: doctor
    });
    modal.present();
  }

}
