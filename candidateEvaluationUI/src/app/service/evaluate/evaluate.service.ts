import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { College } from 'src/app/shared/college';
import { Evaluate } from 'src/app/shared/evaluation-form';

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  baseURL:string = "http://localhost:8080/cep/interviewer/";
  constructor(private http:HttpClient) { }

  
  createForm(newForm:Evaluate){
    return this.http.post(this.baseURL + 'evaluate', newForm);
  }

  extractAllForm(){
    return this.http.get(this.baseURL + 'evaluate');
  }

  // getClgDropDownValues():Observable<any>{
  //   return this.http.get<College[]>(this.baseURL+'admin/college');

  // }


  deleteForm(id:number){
    return this.http.delete(this.baseURL+'evaluate'+id);
  }
}


