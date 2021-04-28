import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { SignUpApproval } from '../shared/login';
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

    createInterviewer(user:SignUpApproval){
      return this.http.post(this.baseUrl+"newuser", user);
    }

    requestSignupUsers(){
      return this.http.get(this.baseUrl+"approveuser");
    }

    rejectUsers(id: number){
      return this.http.delete(this.baseUrl+"rejectuser/"+id);
    }

    checkUserExist(email: String){
      return this.http.get(this.baseUrl +"approveuser/"+email);
    }

    checkEmail(email:String){
      return this.http.get(this.baseUrl+"userexist/"+email);
    }
}