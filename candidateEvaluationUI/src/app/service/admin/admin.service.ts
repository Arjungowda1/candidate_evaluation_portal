import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/login';
import { Weightage } from 'src/app/shared/weightage';


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

  createWeightage(weightage:Weightage){
    return this.http.post(this.baseURL +'features/weightage/new', weightage);
  }

  getWeightage(){
    return this.http.get(this.baseURL +'features/weightage');
  }
}
