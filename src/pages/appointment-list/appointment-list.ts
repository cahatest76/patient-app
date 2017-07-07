import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { AppointmentPage } from '../appointment/appointment'
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { FormHelper } from '../../helpers/form';

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
    public storage: Storage,
    public modalCtrl: ModalController
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

/*
  goToAddAppointment() {
    this.navCtrl.push(AppointmentPage);
  }

  goToAppointment (appointment) {
      this.navCtrl.push(AppointmentPage, { 
        "appointment": appointment
      });
  }
  */

  goToAddAppointment() {
    let modal = this.modalCtrl.create(AppointmentPage, {
    });
    modal.present();
  }

  goToAppointment(appointment) {
    console.log(appointment)
    let modal = this.modalCtrl.create(AppointmentPage, {
      appointment: appointment
    });
    modal.present();
  }

  getFullAddress(address) {
    return FormHelper.getFullAddress(address);
  }

  getContactInfoValue(type, contactInfoType) {
    return FormHelper.getContactInfoValue(type,contactInfoType);
  }

  getTime(dateTime,type){
    let result = "";
    //console.log(dateTime);
    let localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
    let isToday = moment().format("YYYY-MM-DD") == moment(dateTime,localFormat).format("YYYY-MM-DD");
    let isTomorroy = moment().add(1,'d').format("YYYY-MM-DD") == moment(dateTime,localFormat).format("YYYY-MM-DD");
    switch (type) {
      case 'time': 
        result = moment(dateTime,localFormat).format("HH:mm");
        break;
      case 'month':
        if (isToday)
          result = 'Hoy';
        else if (isTomorroy)
          result = 'Mañana';
        else  
          result = moment(dateTime,localFormat).format("MMM");
        break;
      case 'day':
        result = moment(dateTime,localFormat).format("DD");
        break;
    }
    /*
    if (day == moment().format('DD/MM/YYYY'))
      day = 'Hoy'
    else if (day == moment().add(1,'d').format('DD/MM/YYYY'))
      day = 'Mañana'
    result = day + ' - ' + hour;
    console.log (result)    
    */
    return result;
  }

}
