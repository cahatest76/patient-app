import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the DoctorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MedicalProvider {

  public api: string;

  constructor(public http: Http) {
    console.log('Hello DoctorProvider Provider');
    this.api = 'http://localhost:3000/api/';
    //this.api = 'http://13.58.223.181/api/';
  }

  getDoctorList() {
    let url = this.api + 'Doctors?filter[include]=doctorsOffice';
    let response = this.http.get(url).map( res => res.json())
    return response; 
  }

  getAppointmentList(patientId) {
    let url = this.api + `Patients/${patientId}/appointments?filter[include]=doctor`;
    let response = this.http.get(url).map( res => res.json())
    return response; 
  }

  saveAppointment(appointment){
    let url = this.api + 'Appointments'

    let body = JSON.stringify(appointment); // Stringify 
    let headers = new Headers({ 'Content-Type': 'application/json' }); // Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    let response = this.http.post(url,body,options).map(res => res.json());
    console.log(response);
    return response;
    
  }

}
