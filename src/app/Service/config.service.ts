import { Injectable } from '@angular/core';

 //const  endpoint = 'http://localhost/ServiciosEscolares/';
 const endpoint = 'http://54.205.86.7/ServiciosEscolares/';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getEndPoint(){
    return endpoint;
  }
}
