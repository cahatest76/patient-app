import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AvailableTimesPage } from '../available-times/available-times';
import { ServiceTypePage } from '../service-type/service-type';
import { AppointmentListPage } from '../appointment-list/appointment-list';
import { DoctorSelectionPage } from '../doctor-selection/doctor-selection';

import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';


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
  public appointment: AppointmentView;
  public today: any;
  public patientId: string;
  public pageInsertMode: boolean;
  public title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public medicalProvider: MedicalProvider,
    public storage: Storage
  ) {
    let appointment = navParams.get('appointment')
    if (appointment != null) {
      this.title = "Cita"
      this.pageInsertMode = false;
      console.log(navParams.get('appointment'));
      this.appointment = {
        id: appointment.id,
        date: appointment.startTime,
        time: selectOne,
        serviceType: appointment.reason,
        note: appointment.note
      };
      this.doctor = appointment.doctor;
    }
    else {
      this.pageInsertMode = true;
      this.title = "Nueva cita";
      this.doctor = navParams.get('doctor');
      if (this.doctor == null) { //viene del listado de appointments 
        this.doctor = {
          fullName: "Doctor",
          speciality: "Seleccione uno"
        };
      }
      this.today = new Date().toISOString();
      this.appointment = {
        id: '',
        date: this.today,
        time: selectOne,
        serviceType: selectOne,
        note: ''
      };
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');

    this.storage.get('patient.id')
      .then(patientId => {
        this.patientId = patientId;
      })
  }

  saveAppointment() {
    let appointment = {
      doctorId: this.doctor.id,
      patientId: this.patientId,
      startTime: this.appointment.date,
      endTime: this.appointment.date,
      subject: `Visita al doctor ${this.doctor.fullName}`,
      appointmentType: this.doctor.speciality,
      reason: this.appointment.serviceType,
      note: this.appointment.note,
      address: this.doctor.doctorsOffice.address
    }
    this.medicalProvider.saveAppointment(appointment)
      .subscribe(
      response => {
        console.log(response);
        this.navCtrl.setRoot(AppointmentListPage);
      })
  }

  goToAvailableTimes() {
    let modal = this.modalCtrl.create(AvailableTimesPage, {
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.time != "")
        this.appointment.time = data.time;
    });
  }

  goToDoctorSelection() {
    let modal = this.modalCtrl.create(DoctorSelectionPage, {
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data != null)
        this.doctor = data.doctor;
    });
  }

  goToServiceType() {
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
        if (data != "")
          this.appointment.serviceType = data;
      }
    });
    alert.present();
  }

  openDateTime() {
    this.time.open();
  }


  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿ Está seguro de cancelar su cita ?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Ok',
          handler: () => {
            this.medicalProvider.cancelAppointment(this.appointment.id)
              .subscribe(
              response => {
                console.log(response);
                this.navCtrl.setRoot(AppointmentListPage);
              })
          }
        }
      ]
    });
    confirm.present();
  }

}
/*
enum PageMode {
  Insert,
  Update
}*/

export class AppointmentView {
  public id: string;
  public date: any;
  public time: any;
  public note: string;
  public serviceType: string;
}

export class Appointment {
  public doctorId: string;
  public patientId: string;
  public startTime: Date;
  public endTime: Date;
  public subject: string;
  public appointmentType: string;
  public reason: string;
  public note: string;
  public address: any;
}