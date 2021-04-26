import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  baseURL:string = "http://localhost:8080/cep/admin/";

  constructor(
    private http:HttpClient
  ) {

    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });

    return this.http.post<any> (this.baseURL + "signin",user, {headers:headers}).pipe(
      map(response => {
        if(response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return "logout success";
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseURL+ 'signup', user, httpOptions);
  }
}
