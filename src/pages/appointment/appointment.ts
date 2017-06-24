import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AvailableTimesPage } from '../available-times/available-times';
import { ServiceTypePage } from '../service-type/service-type';
import { AppointmentListPage } from '../appointment-list/appointment-list';
import { MedicalProvider } from '../../providers/medical/medical';

/**
 * Generated class for the AppointmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const selectOne: string = "Seleccione uno";

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
  providers: [MedicalProvider]
})

export class AppointmentPage {
  @ViewChild('dateTime') time;

  public doctor: any;
  public appointment : AppointmentView;
  public today:any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl:  ModalController,
      public alertCtrl: AlertController,
      public medicalProvider: MedicalProvider
    ) {
    this.doctor = navParams.get('doctor');
    this.today = new Date().toISOString();

    this.appointment = {
        date: this.today,
        time: selectOne,
        serviceType: selectOne,
        note: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
  }

  saveAppointment(){
    let appointment = {
      doctorId: this.doctor.id,
      patientId: '59449a317819bb5cb460a5d8',
      startTime: this.appointment.date,
      endTime: this.appointment.date,
      subject: `Visita al doctor ${this.doctor.fullName}`,
      appointmentType: this.doctor.speciality,
      reason: this.appointment.serviceType,
      note: this.appointment.note,
      address: this.doctor.doctorsOffice.address
    }
    this.medicalProvider.saveAppointment(appointment)
      .subscribe ( 
          response => {
            console.log(response);
            this.navCtrl.setRoot(AppointmentListPage);
          })
  }

  goToAvailableTimes(){
    let modal = this.modalCtrl.create(AvailableTimesPage, {
      
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.time != "" )
        this.appointment.time = data.time;
    });
  }

  goToServiceType(){
    
    let alert = this.alertCtrl.create();
    alert.setTitle('Tipo de servicio');

    for (let serviceType of this.doctor.serviceTypes) {
      alert.addInput({
        type: 'radio',
        label: serviceType.name,
        value: serviceType.name,
        checked: serviceType.name == this.appointment.serviceType
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        if (data != "" )
          this.appointment.serviceType = data;
      }
    });
    alert.present();
  }

  openDateTime(){
    this.time.open();
  }

}

export class AppointmentView
{
  public date:any;
  public time:any;
  public note:string;
  public serviceType:string;
}

export class Appointment {
  public doctorId:string;
  public patientId:string;
  public startTime: Date;
  public endTime: Date;
  public subject: string;
  public appointmentType: string;
  public reason: string;
  public note:string;
  public address: any;
}