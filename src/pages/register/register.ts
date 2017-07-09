import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { TabsPage } from '../tabs/tabs'
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../helpers/form';
import { ValidationHelper } from '../../helpers/validation';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [MedicalProvider],
})
export class RegisterPage {

  public onBoarding: OnBoardingView;
  public form: FormGroup;

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public medicalProvider: MedicalProvider,
    public storage: Storage,
    public formBuilder: FormBuilder
  ) {
    //this.onBoarding = new OnBoardingView();
    this.buildForm();
    this.onBoarding = {
      name: "Cesar",
      lname: "Herrera",
      phone: "2299215269",
      mobile: "8116114690",
      email: "caha76@gmail.com",
      password: "123"
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      lname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([])],
      mobile: ['', Validators.compose([])],
      email: ['', Validators.compose([Validators.required, ValidationHelper.email])],
      password: ['', Validators.compose([Validators.required])]
    })
    this.form.valueChanges
      .subscribe(data => FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages, data));
    FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  formErrors = {

    'name': '',
    'lname': '',
    'phone': '',
    'mobile': '',
    'email': '',
    'password': ''
  };

  validationMessages = {
    'name': {
      'required': 'Este campo es requerido.'
    },
    'lname': {
      'required': 'Este campo es requerido.'
    },
    'phone': {
      'phone': 'Este campo tiene formato inválido.'
    },
    'mobile': {
      'phone': 'Este campo tiene formato inválido.'
    },
    'email': {
      'required': 'Este campo es requerido',
      'email': 'Este campo tiene formato inválido',
    },
    'password': {
      'required': 'Este campo es requerido.'
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /*
  close() {
    this.viewCtrl.dismiss();
  }*/

  save() {
    let onBoarding: OnBoarding = {
      onBoardingType: 'Patient',
      password: this.onBoarding.password,
      name: this.onBoarding.name,
      lname: this.onBoarding.lname,
      //gender: this.onBoardingView.gender,
      //birthdate: this.onBoardingView.birthdate,
      contactInfos: [
        {
          contactInfoType: 'Email',
          value: this.onBoarding.email
        }
      ]
    };
    if (this.onBoarding.phone) {
      onBoarding.contactInfos.push({
        contactInfoType: 'Phone',
        value: this.onBoarding.phone
      });
    };
    if (this.onBoarding.mobile) {
      onBoarding.contactInfos.push({
        contactInfoType: 'Mobile',
        value: this.onBoarding.mobile
      });
    };

    this.medicalProvider.saveOnBoarding(onBoarding)
      .subscribe(
      onboarding => {
        //console.log(onboarding);
        this.medicalProvider.getPatient(onboarding.patientId).subscribe(
          patient => {
            this.storage.set("patient", patient);
            this.viewCtrl.dismiss();
            this.appCtrl.getRootNav().setRoot(TabsPage, { tabIndex: 0 });
          })
      })
  }

}

export class OnBoardingView {
  public password: string;
  public name: string;
  public lname: string;
  //public gender: string;
  //public birthdate: Date;
  public email: string;
  public phone: string;
  public mobile: string;
}

export class ContactInfo {
  public contactInfoType: string;
  public value: string;
}

export class OnBoarding {
  public onBoardingType: string;
  public password: string;
  public name: string;
  public lname: string;
  //public gender: string;
  //public birthdate: Date;
  public contactInfos: ContactInfo[];
}

