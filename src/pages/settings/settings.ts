import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormHelper } from '../../helpers/form';
import { FieldPage } from '../field/field'


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public patient: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.patient = {};
    this.storage.get('patient')
      .then(patient => {
        this.patient = patient;
        console.log(this.patient);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  getContactInfoValue(type, contactInfoType) {
    return FormHelper.getContactInfoValue(type, contactInfoType);
  }

  goToField(obj, fieldName, fieldLabel,validation="", subObjectName="", subObjectKey="") {
    let field = {
      containerObj: this.patient,
      obj: obj,
      fieldName: fieldName,
      fieldValue: obj[fieldName],
      fieldLabel: fieldLabel,
      subObjectName:subObjectName, 
      subObjectKey:subObjectKey,
      validation: validation
    }
    this.navCtrl.push(FieldPage, { field: field })
      
  }
}

