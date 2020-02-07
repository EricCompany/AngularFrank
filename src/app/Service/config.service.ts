import { Injectable } from '@angular/core';

// const  endpoint = 'http://localhost/ServiciosEscolares/';
   const endpoint = 'http://52.170.42.232/ServiciosEscolares/';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getEndPoint(){
    return endpoint;
  }
}
