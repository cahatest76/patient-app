import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavParams, ModalController, AlertController, ViewController, ToastController } from 'ionic-angular';
import { AvailableTimesPage } from '../available-times/available-times';
import { ServiceTypePage } from '../service-type/service-type';
//import { AppointmentListPage } from '../appointment-list/appointment-list';
import { DoctorSelectionPage } from '../doctor-selection/doctor-selection';
import { TabsPage } from '../tabs/tabs';

import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { FormHelper } from '../../helpers/form';
import { NotificationHelper } from '../../helpers/notification';


const selectOne: string = "Seleccione uno";

@IonicPage()
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html',
    providers: [MedicalProvider]
})

export class AppointmentPage {
    @ViewChild('calendar') calendar;

    public doctor: any;
    public appointment: AppointmentView;
    public today: any;
    public patientId: string;
    public patientFullName: string;
    public pageInsertMode: boolean;
    public title: string;
    public openFromRootPage: boolean;

    constructor(
        public appCtrl: App,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public medicalProvider: MedicalProvider,
        public storage: Storage,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController
    ) {
        let appointment = navParams.get('appointment')
        //console.log ('openFromRootPage:' +navParams.get('openFromRootPage'))
        //this.openFromRootPage = navParams.get('openFromRootPage') == null ? false : navParams.get('openFromRootPage');
        this.today = new Date().toISOString();
        var localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
        this.today = moment().format(localFormat);
        //console.log(this.today)
        if (appointment != null) {
            this.title = "Cita"
            this.pageInsertMode = false;
            console.log(navParams.get('appointment'));
            /*
            this.appointment = {
                id: appointment.id,
                date: appointment.startTime,
                time: selectOne,
                serviceType: appointment.reason,
                note: appointment.note
            };*/
            let localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
            this.appointment = new AppointmentView();
            this.appointment.id = appointment.id;
            this.appointment.date = appointment.startTime;
            this.appointment.time = moment(appointment.startTime,localFormat).format("HH:mm")
            this.appointment.serviceType = appointment.reason;
            this.appointment.note = appointment.note;

            this.doctor = {
                id: appointment.doctorId,
                fullName: appointment.providerName,
                speciality: appointment.subject
            };

            appointment.doctor;
        }
        else {
            this.pageInsertMode = true;
            this.title = "Agendar cita";
            this.doctor = navParams.get('doctor');
            if (this.doctor == null) { //viene del listado de appointments 
                this.doctor = {
                    id: "",
                    fullName: "Doctor",
                    speciality: "Seleccione uno"
                };
            }
            this.appointment = new AppointmentView();
            this.appointment.date = this.today;
            this.appointment.time = selectOne;
            this.appointment.serviceType = selectOne;
            /*
                        this.appointment = {
                            id: '',
                            date: this.today,
                            time: selectOne,
                            serviceType: selectOne,
                            note: ''
                        };
                        */
        }
    }

    ionViewDidLoad() {
        this.storage.get('patient.id')
            .then(patientId => {
                this.patientId = patientId;
            })

        this.storage.get('patient.fullName')
            .then(patientFullName => {
                this.patientFullName = patientFullName;
            })
    }

    appointmentValidation() {
        console.log(this.appointment.serviceType)
        let errorMsg = "";
        if (this.doctor.id == "")
            errorMsg = NotificationHelper.addError(errorMsg, "Debe seleccionar un doctor")
        else {
            if (this.appointment.time == selectOne)
                errorMsg = NotificationHelper.addError(errorMsg, "Debe seleccionar una hora")
            if (this.appointment.serviceType == selectOne)
                errorMsg = NotificationHelper.addError(errorMsg, "Debe seleccionar un tipo de servicio")
        }
        if (errorMsg != "") {
            NotificationHelper.showError(this.toastCtrl, errorMsg);
            return false;
        }
        else
            return true
    }

    getTime(date, time, duration, type) {
        let result;
        let localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
        let day = moment(date, localFormat).format('YYYY-MM-DD');
        if (type == "start")
            result = day + "T" + time;
        else {
            let endTime = moment(time, "HH:mm:ss").add(duration, 'm').format("HH:mm:ss")
            result = day + "T" + endTime;
        }
        console.log(result);
        return result;
    }

    saveAppointment() {
        if (this.appointmentValidation()) {
            let appointment = {
                doctorId: this.doctor.id,
                patientId: this.patientId,
                startTime: this.getTime(this.appointment.date, this.appointment.time, 30, 'start'),
                endTime: this.getTime(this.appointment.date, this.appointment.time, 30, 'end'),
                subject: this.doctor.speciality,
                reason: this.appointment.serviceType,
                note: this.appointment.note,
                place: this.doctor.doctorsOffice,
                providerName: this.doctor.fullName,
                providerContactInfos: this.doctor.contactInfos,
                receiverName: this.patientFullName
                //todo receiver contactinfo
            }
            delete appointment.place.id;
            this.medicalProvider.saveAppointment(appointment)
                .subscribe(
                response => {
                    this.viewCtrl.dismiss();
                    this.appCtrl.getRootNav().setRoot(TabsPage, { tabIndex: 1 });
                })
        }
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
        this.calendar.open();
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
                                //console.log(response);
                                this.viewCtrl.dismiss();
                                this.appCtrl.getRootNav().setRoot(TabsPage, { tabIndex: 1 });
                            })
                    }
                }
            ]
        });
        confirm.present();
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
/*
enum PageMode {
  Insert,
  Update
}*/

export class AppointmentView {
    public id: string;
    private _date?: any = moment().toDate();
    public get date(): any {
        return this._date;
    };
    public set date(value: any) {
        console.log('setter:' + value)
        this._date = value;
        this.displayDate = moment(this._date.slice(0, 10)).format("DD/MM/YYYY");
    };
    public displayDate?: string;
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