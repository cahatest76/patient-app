import { Injectable } from '@angular/core';

@Injectable()
export class FormHelper {

  static onFormValueChanged(form: any, formErrors: any, validationMessages: any, data?: any) {
    if (!form) { return; }
    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          if (formErrors[field] == '')
            formErrors[field] += messages[key]
          else
            formErrors[field] += ', ' + messages[key];
        }
      }
    }
  }

  static getFullAddress(address) {
    //console.log(address);
    let result = `${address.street} ${address.extNum}`
    if (address.intNum)
      result += `-${address.intNum}`
    result += `<br/>`
    //if (address.district && address.municipality)
    //  result += `${address.district}, ${address.municipality}<br/>`
    //else 
    if (address.district)
      result += `${address.district}<br/>`
    //else
    //  result += `${address.municipality}<br/>`
    result += `${address.city}, ${address.state} ${address.zip}`
    if (address.country != 'México')
      result += `<br/>${address.country}`
    return result;
  }

  static getContactInfoValue(type, contactInfoType) {
    //console.log('conctact info:' + type + ' ' + contactInfoType)
    let result = contactInfoType;
    if (type == 'label') {
      switch (contactInfoType) {
        case 'Email': result = 'Correo'; break;
        case 'Phone': result = 'Teléfono'; break;
        case 'Mobile': result = 'Celular'; break;
      }
    }
    else if (type == 'icon') {
      switch (contactInfoType) {
        case 'Email': result = 'mail'; break;
        case 'Phone': result = 'call'; break;
        case 'Mobile': result = 'call'; break;
      }
    }
    return result;
  }

}