import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/login';
import { College } from 'src/app/shared/college';
import { Weightages } from 'src/app/shared/evaluationFactors';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL:string = "http://localhost:8080/cep/admin/";
  constructor(
    private http:HttpClient
  ) { 
  }


  createUser(newUser:Login){
    return this.http.post(this.baseURL + 'user/create', newUser);
  }

  extractAllUsers(){
    return this.http.get(this.baseURL + 'users');
  }

  createWeightage(weightage:Weightages[]){
    return this.http.post(this.baseURL +'features/weightage/new', weightage);
  }

  getWeightage(){
    return this.http.get(this.baseURL +'features/weightage');
  }

  deleteWeightage(){
    return this.http.delete(this.baseURL+'features/weightage/remove');
  }

  setTier(college:College[]){
    return this.http.post(this.baseURL+"features/tier/new", college);
  }

  getTier(){
    return this.http.get(this.baseURL + "features/tier");
  }

  deleteTier(id: number){
    return this.http.delete(this.baseURL + "features/tier/"+id);
  }
}
