import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from './config.service';


const HEADER = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private endpoint: ConfigService) { }

  Login(User: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Login/login.php', User, );
  }

  Registro(User: FormData): Observable<any>{
    return  this.http.post(this.endpoint.getEndPoint() + 'Login/registrar.php', User, );
  }

  recoveryPass(email: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'RecoveryPassword/recuperar.php', email, );
  }





}

