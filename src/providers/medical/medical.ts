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

  public static Error_Login_Fail = "LOGIN_FAILED";

  public api: string;

  constructor(public http: Http) {
    this.api = 'http://localhost:3000/api/';
    //this.api = 'http://13.58.223.181/api/';
  }

  getDoctorList(patientId) {
    let url = this.api + `Patients/${patientId}/doctorList?filter[include]=doctorsOffice`;
    let response = this.http.get(url).map( res => res.json())
    return response; 
  }

  getAppointmentList(patientId) {
    //let url = this.api + `Patients/${patientId}/appointments?filter[include]=doctor`;
    let url = this.api + `Patients/${patientId}/appointments`;
    console.log(url);
    let response = this.http.get(url).map( res => res.json())
    return response; 
  }

  getPatientByAccountId(accountId){
    let url = this.api + `Patients?filter[where][accountId]=${accountId}`;
    let response = this.http.get(url).map( res => res.json())
    return response; 
  }

  saveAppointment(appointment){
    let url = this.api + 'Appointments'
    let body = JSON.stringify(appointment); // Stringify 
    let headers = new Headers({ 'Content-Type': 'application/json' }); // Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    let response = this.http.post(url,body,options).map(res => res.json());
    return response;
  }

    cancelAppointment(appointmentid){
    let url = this.api + `Appointments/${appointmentid}`
    let response = this.http.delete(url).map(res => res.json());
    return response;
  }

  saveOnBoarding(onBoarding){
    let url = this.api + 'OnBoardings'
    let body = JSON.stringify(onBoarding); // Stringify 
    let headers = new Headers({ 'Content-Type': 'application/json' }); // Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    let response = this.http.post(url,body,options).map(res => res.json());
    return response;
  }

  login(credentials){
    let url = this.api + 'Accounts/login';
    let body = JSON.stringify(credentials); // Stringify 
    let headers = new Headers({ 'Content-Type': 'application/json' }); // Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    let response = this.http.post(url,body,options).map( res => res.json())
    return response; 
  }

  addDoctor(patientId,invitationNumber){
    let url = this.api + `Patients/${patientId}/doctorList/rel/${invitationNumber}`;
    let response = this.http.put(url,'').map( res => res.json())
    return response; 
  }

}
