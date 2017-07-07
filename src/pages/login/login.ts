import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NgForm } from '@angular/forms';

import { RegisterPage } from '../register/register'
import { TabsPage } from '../tabs/tabs'
import { LandingPage } from '../landing/landing'

import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';
import { FormHelper } from '../../helpers/form';
import { ValidationHelper } from '../../helpers/validation';
import { NotificationHelper } from '../../helpers/notification';

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
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public medicalProvider: MedicalProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public storage: Storage
  ) {
    //this.credentials = new Credentials();
    this.credentials = {
      email: 'caha76@gmail.com',
      password: '123'
    }
    this.buildForm();
  }


  buildForm() {
    this.form = this.formBuilder.group({
      email:    ['',Validators.compose ([Validators.required, ValidationHelper.email])],
      password: ['',Validators.compose ([Validators.required])]
    })
    this.form.valueChanges
       .subscribe(data => FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages, data));
    FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Este campo es requerido',
      'email': 'Este campo tiene formato inválido',
    },
    'password': {
      'required': 'Este campo es requerido.'
    }
  };

  ionViewDidLoad() {
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

  logInSuccess(account) {
    console.log(account);
    this.medicalProvider.getPatientByAccountId(account.userId)
      .subscribe(
      res => {
        console.log(res);
        if (res.length == 0) {
          NotificationHelper.showError(this.toastCtrl, "No hay paciente asignado a esa cuenta");
          return;
        }
        let patient = res[0];
        this.storage.set('patient.id', patient.id);
        this.storage.set('patient.fullName', patient.fullName)

        console.log('Patient id:' + this.storage.get('patient.id'));

        if (patient.doctors.length == 0)
          this.navCtrl.setRoot(LandingPage);
        else
          this.navCtrl.setRoot(TabsPage, { tabIndex: 0 });
      }
      )

  }

  logInError(errObj) {
    let err: Error = JSON.parse(errObj._body).error;
    let errorMsg = "";
    if (err.code == MedicalProvider.Error_Login_Fail)
      errorMsg = "Correo o contraseña inválidos";
    else
      errorMsg = err.message;
    NotificationHelper.showError(this.toastCtrl, errorMsg);
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

