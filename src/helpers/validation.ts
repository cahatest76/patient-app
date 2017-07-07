import { Injectable } from '@angular/core';

@Injectable()
export class ValidationHelper {

    static email(control) {
        if (control.value == '') return null;
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(control.value)) {
            return null;
        } else {
            return { 'email': true };
        }
    }




}