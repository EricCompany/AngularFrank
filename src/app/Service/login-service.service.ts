import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  Login(User: FormData): Observable<any> {
    return this.http.post('http://localhost/ServiciosEscolares/Login/login.php', User, '');
  }


}

