import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { RegisterPage } from '../register/register'
import { DoctorListPage } from '../doctor-list/doctor-list'
import { AppointmentListPage } from '../appointment-list/appointment-list'

import { LandingPage } from '../landing/landing'

import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MedicalProvider]
})
export class LoginPage {

  public credentials: Credentials;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public medicalProvider: MedicalProvider,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    //this.credentials = new Credentials();
    this.credentials = {
      email: 'caha76@gmail.com',
      password: '123'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegister() {
    let modal = this.modalCtrl.create(RegisterPage, {

    });
    modal.present();

  }

  logIn() {

    this.medicalProvider.login(this.credentials)
      .subscribe(
        res => { 
          this.logInSuccess(res);
        },
        err => {
          this.logInError(err);
        }

    )
  }

  logInSuccess(account){
    console.log(account);
    this.medicalProvider.getPatientByAccountId(account.userId)
      .subscribe( 
        res => {
          console.log(res);
          if (res.length == 0){
            this.showError("No hay paciente asignado a esa cuenta");
            return;
          }
          let patient = res[0];
          this.storage.set('patient.id',patient.id)
          console.log('Patient id:' +this.storage.get('patient.id'));
          
          if (patient.doctors.length == 0)
              this.navCtrl.setRoot(LandingPage);
          else
            this.navCtrl.setRoot(DoctorListPage);
            //this.navCtrl.setRoot(AppointmentListPage);

        }
      )

  }

  showError(errorMsg){
    let toast = this.toastCtrl.create({
      //cssClass: 'errorNotification',
      message: errorMsg,
      duration: 3000
    });
    toast.present();
  }

  logInError(errObj){
    let err: Error = JSON.parse(errObj._body).error;
    let errorMsg = "";
    if (err.code == MedicalProvider.Error_Login_Fail)
      errorMsg = "Correo o contraseña inválidos";
    else
      errorMsg = err.message;
    this.showError(errorMsg);
  }

}

export class Error {
  public message: string;
  public code: string;
}

export class Credentials {
  public email: string;
  public password: string;
}
