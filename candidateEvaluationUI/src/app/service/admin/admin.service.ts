import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { College } from 'src/app/shared/college';
import { Weightages } from 'src/app/shared/evaluationFactors';
import { User } from 'src/app/shared/user';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  currentUser: User;
  headers: HttpHeaders;
  baseURL:string = "http://localhost:8080/cep/admin/";
  constructor(
    private http:HttpClient
  ) {   

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });

  }

  deleteUser(id:number){
    return this.http.delete(this.baseURL +'user/delete/'+id,{headers: this.headers});
  }

  extractAllUsers(){
    return this.http.get(this.baseURL + 'users',{headers: this.headers});
  }

  createWeightage(weightage:Weightages[]){
    return this.http.post(this.baseURL +'features/weightage/new', weightage,{headers: this.headers});
  }

  getWeightage(){
    return this.http.get(this.baseURL +'features/weightage',{headers: this.headers});
  }

  deleteWeightage(){
    return this.http.delete(this.baseURL+'features/weightage/remove',{headers: this.headers});
  }

  setTier(college:College[]){
    return this.http.post(this.baseURL+"features/tier/new", college,{headers: this.headers});
  }

  getTier(){
    return this.http.get(this.baseURL + "features/tier",{headers: this.headers});
  }

  deleteTier(id: number){
    return this.http.delete(this.baseURL + "features/tier/"+id,{headers: this.headers});
  }

  getAllSelects(){
    return this.http.get(this.baseURL+"features/finalselects",{headers: this.headers});
  }

  deleteAllForms(){
    return this.http.delete(this.baseURL+"features/deleteall",{headers: this.headers})
  }
}
