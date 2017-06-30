import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { HomePage } from '../home/home'


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [MedicalProvider],
})
export class RegisterPage {

  public onBoarding: OnBoardingView;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public medicalProvider: MedicalProvider
  ) {
    //this.onBoarding = new OnBoardingView();
    this.onBoarding = {
      name: "Cesar",
      lname: "Herrera",
      phone: "2299215269",
      mobile: "8116114690",
      email: "caha76@gmail.com",
      password: "123"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

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
      .subscribe ( 
          response => {
            console.log(response);
            this.navCtrl.setRoot(HomePage);
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

