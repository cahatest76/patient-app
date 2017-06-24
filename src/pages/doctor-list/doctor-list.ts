import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DoctorPage } from '../doctor/doctor'
import { MedicalProvider } from '../../providers/medical/medical';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicalProvider: MedicalProvider
  ) {

    this.doctors = [];
  }

  ngOnInit() {
    this.medicalProvider.getDoctorList()
      .subscribe ( 
          doctors => {
            this.doctors  = doctors;
            console.log(this.doctors);
          }
      )
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

}
