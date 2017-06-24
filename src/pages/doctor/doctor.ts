import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppointmentPage } from '../appointment/appointment'

/**
 * Generated class for the DoctorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {

  public doctor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.doctor = navParams.get('doctor');
    console.log(this.doctor);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorPage');
  }

  goToSchedule(doctor) {
    this.navCtrl.push(AppointmentPage, { doctor: doctor });
  }

  getContactInfoValue(type, contactInfoType){
    //console.log('conctact info:' + type + ' ' + contactInfoType)
    let result = contactInfoType;
    if (type == 'label'){
      switch (contactInfoType){
        case 'Email' : result = 'Correo'; break;
        case 'Phone' : result = 'Teléfono'; break;
        case 'Mobile' : result = 'Celular'; break;
      }
    }
    else if (type == 'icon'){
      switch (contactInfoType){
        case 'Email' : result = 'mail'; break;
        case 'Phone' : result = 'call'; break;
        case 'Mobile' : result = 'call'; break;
      }
    }
    return result;
  }

  getFullAddress(address){
    //console.log(address);
    let result = `${address.street} ${address.extNum}` 
    if (address.intNum)
       result += `-${address.intNum}`
    result += `<br/>`
    if (address.district && address.municipality)
      result += `${address.district}, ${address.municipality}<br/>`
    else if (address.district)
      result += `${address.district}<br/>`
    else
      result += `${address.municipality}<br/>`
    result += `${address.city}, ${address.state} ${address.zip}<br/>${address.country}`
    return result;
   
  }

}
