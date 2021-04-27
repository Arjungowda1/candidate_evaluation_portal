import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
@Injectable({
  providedIn: 'root'
})
export class PasswordService{
    constructor(private http:HttpClient){

    }

    baseUrl = "http://localhost:8080/cep/interviewer/";

    getKey(email:string){
        return this.http.get(this.baseUrl + 'forgotpassword/'+email,{ responseType: 'text' });
      }
    

    resetPassword(user:User){
        return this.http.put(this.baseUrl+"newpassword", user,{ responseType: 'text' })
    }
}