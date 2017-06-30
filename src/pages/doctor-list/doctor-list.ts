import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DoctorPage } from '../doctor/doctor'
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
    public storage: Storage
  ) {

    this.doctors = [];

  }

  ngOnInit() {
    this.storage.get('patient.id')
      .then(patientId => {
        this.patientId = patientId;

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

  goToDoctor(doctor) {
    console.log(this.navCtrl.getViews());
    this.navCtrl.push(DoctorPage, { doctor: doctor });
  }

  goToAddDoctor(){
    this.navCtrl.push(DoctorInvitationPage);
  }

}
