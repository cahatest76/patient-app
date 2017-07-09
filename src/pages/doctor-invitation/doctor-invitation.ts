import { Component } from '@angular/core';
import { IonicPage, App, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MedicalProvider } from '../../providers/medical/medical';
import { FormHelper } from '../../helpers/form';
import { NotificationHelper } from '../../helpers/notification';
import { TabsPage } from '../tabs/tabs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  public form: FormGroup;

  constructor(
    public appCtrl: App,
    public navParams: NavParams,
    public storage: Storage,
    public medicalProvider: MedicalProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      invitationNumber: ['', Validators.compose([Validators.required])]
    })
    this.form.valueChanges
      .subscribe(data => FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages, data));
    FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  formErrors = {
    'invitationNumber': ''
  };

  validationMessages = {
    'invitationNumber': {
      'required': 'Este campo es requerido'
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorInvitationPage');
  }

  addDoctor() {
    this.storage.get('patient')
      .then(patient => {
        this.medicalProvider.addDoctor(patient.id, this.invitationNumber)
          .subscribe(
          res => {
            console.log(res);
            if (res != null) {
              this.viewCtrl.dismiss();
              this.appCtrl.getRootNav().setRoot(TabsPage, { tabIndex: 0 });
            }
            else
              NotificationHelper.showError(this.toastCtrl, "El número de invitación no fue encontrado, favor de verificar")
          }
          )
      })
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

