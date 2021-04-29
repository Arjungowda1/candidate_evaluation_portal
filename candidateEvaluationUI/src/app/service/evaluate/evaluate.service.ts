import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { College } from 'src/app/shared/college';
import { Evaluate } from 'src/app/shared/evaluation-form';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  currentUser: User;
  headers: HttpHeaders;
  baseUrl:string = "http://localhost:8080/cep/admin/";

  baseURL:string = "http://localhost:8080/cep/interviewer/";
  constructor(private http:HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
   }

  
  createForm(newForm:Evaluate){
    return this.http.post(this.baseURL + 'evaluate', newForm);
  }

  extractAllForm(id:number){
    return this.http.get(this.baseURL + 'evaluate/'+id);
  }

  // getClgDropDownValues():Observable<any>{
  //   return this.http.get<College[]>(this.baseURL+'admin/college');

  // }
  getWeightage(){
    return this.http.get(this.baseUrl +'features/weightage',{headers: this.headers});
  }

  extractUser(id:number){
    return this.http.get(this.baseURL + 'user/'+id,{headers: this.headers});
  }
  
  extractAllUsers(){
    return this.http.get(this.baseURL + 'users',{headers: this.headers});
  }

  getTier(){
    return this.http.get(this.baseUrl + "features/tier",{headers: this.headers});
  }

  deleteForm(id:number){
    return this.http.delete(this.baseURL+'evaluate'+id);
  }
}


