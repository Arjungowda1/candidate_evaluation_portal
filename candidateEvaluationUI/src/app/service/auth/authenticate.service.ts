import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  baseURL:string = "http://localhost:8080/cep/admin/";

  constructor(
    private http:HttpClient
  ) { }

  verifyUser(login: Login){
    
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }

    return this.http.post(this.baseURL + 'user',login);
  }
}
