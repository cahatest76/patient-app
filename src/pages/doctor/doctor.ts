import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
import { AppointmentPage } from '../appointment/appointment'
import { FormHelper } from '../../helpers/form';

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {

  public doctor: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController
    ) {

    this.doctor = navParams.get('doctor');
    console.log(this.doctor);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorPage');
  }

  goToSchedule(doctor) {
    let modal = this.modalCtrl.create(AppointmentPage, {
      doctor: doctor
    });
    modal.present();
  }

  getContactInfoValue(type, contactInfoType) {
    return FormHelper.getContactInfoValue(type,contactInfoType);
  }

  getFullAddress(address) {
    return FormHelper.getFullAddress(address);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
