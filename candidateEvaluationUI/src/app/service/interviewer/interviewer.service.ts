import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/user';
import { Result } from 'src/app/shared/result';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  currentUser: User;
  headers: HttpHeaders;
  baseURL:string = "http://localhost:8080/cep/interviewer/";
  constructor(
    private http:HttpClient
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
   }
  


  getInterviewers(id: number){
    return this.http.get(this.baseURL+'user/'+id);
  }

  saveResult(result:Result){
    return this.http.post(this.baseURL+'saveresult',result,{headers:this.headers});
  }
  

}
