import { Injectable } from '@angular/core';

@Injectable()
export class NotificationHelper {

    static showError(ctrl,errorMsg) {
        let toast = ctrl.create({
            message: errorMsg,
            duration: 3000
        });
        toast.present();
    }

     static addError(errorMsg, error) {
        let separator = ", "
        if (errorMsg == "")
            errorMsg += error;
        else
            errorMsg += separator + error;
        return errorMsg;
    }
}