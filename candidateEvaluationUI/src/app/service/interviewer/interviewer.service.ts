import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/login';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  constructor(
    private http:HttpClient
  ) { }
  baseUrl = "http://localhost:8080/cep/interviewer/";


  getInterviewers(id: number){
    return this.http.get(this.baseUrl+'user/'+id);
  }


}
