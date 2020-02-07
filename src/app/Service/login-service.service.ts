import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from './config.service';
import {url} from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private endpoint: ConfigService) { }

  Login(User: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Login/login.php', User, '');
  }

  Registro(User: FormData): Observable<any>{
    return  this.http.post(url(this.endpoint.getEndPoint() + '', User, '');
  }


}

