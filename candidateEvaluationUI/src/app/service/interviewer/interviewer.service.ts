import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/user';
import { SignUpApproval } from 'src/app/shared/login';
import { Result } from 'src/app/shared/result';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  currentUser: User;
  headers: HttpHeaders;
  constructor(
    private http:HttpClient
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
   }
  baseUrl = "http://localhost:8080/cep/interviewer/";


  getInterviewers(id: number){
    return this.http.get(this.baseUrl+'user/'+id,{headers: this.headers});
  }

  saveResult(result:Result){
    return this.http.post(this.baseUrl+'saveresult',result,{headers:this.headers});
  }
}
