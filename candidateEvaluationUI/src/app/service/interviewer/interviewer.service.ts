import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/user';

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
