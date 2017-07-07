import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MedicalProvider } from '../../providers/medical/medical';
import { SettingsPage } from '../settings/settings'
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../helpers/form';
import { ValidationHelper } from '../../helpers/validation';

@IonicPage()
@Component({
  selector: 'page-field',
  templateUrl: 'field.html',
  providers: [MedicalProvider]
})
export class FieldPage {

  public field;
  public form: FormGroup;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public medicalProvider: MedicalProvider,
      public viewCtrl: ViewController,
      public storage: Storage,
      public formBuilder: FormBuilder
    ) {
    this.field = navParams.get('field');
    this.buildForm();
  }
     // email:    ['',Validators.compose ([Validators.required, ValidationHelper.email])],

  buildForm() {
    if (this.field.validation == "Email") {
      this.form = this.formBuilder.group({
        field: ['', Validators.compose([Validators.required, ValidationHelper.email])]
      })  
      this.validationMessages.field["email"] = 'Este campo tiene formato inválido';
    }
    else
      this.form = this.formBuilder.group({
        field: ['', Validators.compose([Validators.required])]
      })  

    this.form.valueChanges
      .subscribe(data => FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages, data));
console.log(this.validationMessages);
    FormHelper.onFormValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  formErrors = {
    'field': ''
  };

  validationMessages = {
    'field': {
      'required': 'Este campo es requerido'
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldPage');
  }

  updateField(){
    this.medicalProvider.updatePatientField(this.field.containerObj.id, this.field.fieldName, this.field.fieldValue, this.field.subObjectName, this.field.subObjectKey)
      .subscribe(
        response => {
          console.log(response);
          //this.viewCtrl.dismiss( { result: 'true' } );
          this.field.obj[this.field.fieldName] = this.field.fieldValue;
          this.storage.set('patient', this.field.containerObj);
          this.navCtrl.setRoot(SettingsPage);
        },
        error => {
          console.log(error);
        }
      )

  }

}
