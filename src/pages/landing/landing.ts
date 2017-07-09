import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { Storage } from '@ionic/storage';
import { DoctorListPage } from '../doctor-list/doctor-list'
import { NotificationHelper } from '../../helpers/notification';

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
  providers: [MedicalProvider]
})
export class LandingPage {

  public invitationNumber: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicalProvider: MedicalProvider,
    public storage: Storage,
    public toastCtrl:ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  addDoctor() {
    this.storage.get('patient')
      .then(patient => {
        this.medicalProvider.addDoctor(patient.id, this.invitationNumber)
          .subscribe(
            res => {
              console.log(res);
              if (res != null)
                this.navCtrl.setRoot(DoctorListPage);
              else
                NotificationHelper.showError(this.toastCtrl, "El número de invitación no fue encontrado, favor de verificar")
            }
          )
      })
  }

}
