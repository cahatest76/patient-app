import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MedicalProvider } from '../../providers/medical/medical';


/**
 * Generated class for the DoctorSelectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor-selection',
  templateUrl: 'doctor-selection.html',
  providers: [MedicalProvider]
})
export class DoctorSelectionPage {

  public patientId: string;
  public doctors: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public medicalProvider: MedicalProvider
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('patient.id')
      .then(patientId => {
        this.patientId = patientId;

        this.medicalProvider.getDoctorList(this.patientId)
          .subscribe(
          doctors => {
            this.doctors = doctors;
            console.log(this.doctors);
          }
          )
      })
  }

  selectDoctor(doctorSelected) {
    console.log(this.navCtrl.getViews());
    //this.navCtrl.pop({ doctor: doctor});
    this.viewCtrl.dismiss({ "doctor": doctorSelected });

  }

  close(){
    this.viewCtrl.dismiss();
  }

}
