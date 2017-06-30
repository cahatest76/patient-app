import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MedicalProvider } from '../../providers/medical/medical';
import { DoctorListPage } from '../doctor-list/doctor-list'

/**
 * Generated class for the DoctorInvitationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor-invitation',
  templateUrl: 'doctor-invitation.html',
  providers: [MedicalProvider]
})
export class DoctorInvitationPage {

  public invitationNumber: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public medicalProvider: MedicalProvider,
    public toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorInvitationPage');
  }

  addDoctor() {
    this.storage.get('patient.id')
      .then(patientId => {
        this.medicalProvider.addDoctor(patientId, this.invitationNumber)
          .subscribe(
          res => {
            console.log(res);
            if (res != null)
              this.navCtrl.setRoot(DoctorListPage);
            else
              this.showError("El número de invitación no fue encontrado, favor de verificar")
          }
          )
      })
  }

  showError(errorMsg) {
    let toast = this.toastCtrl.create({
      //cssClass: 'errorNotification',
      message: errorMsg,
      duration: 3000
    });
    toast.present();
  }

}
