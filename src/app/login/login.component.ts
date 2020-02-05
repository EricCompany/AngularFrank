import { Component, OnInit } from '@angular/core';

// import para form
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService} from '../Service/login-service.service';
import {ResponseDTO} from '../DTO/ResponseDTO';
// DTO
import {LoginDTO} from '../DTO/LoginDTO';
import {JsonFormatter} from 'tslint/lib/formatters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  resp: ResponseDTO;
  // Variabler globales form
  constructor(private form: FormBuilder, private http: LoginServiceService, private router: Router) {

    //  creamos el Form
    this.checkoutForm = this.form.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
  }

  login() {
    // [routerLink]="['/ModuloBecas/']"
    // console.log(this.checkoutForm.value);

    let formData = new FormData();
    formData.append('user', this.checkoutForm.value.user);
    formData.append('password', this.checkoutForm.value.password);

    this.http.Login(formData).subscribe(
      (resp) => {
        this.resp = resp;

         if(this.resp.status){
           sessionStorage.setItem('DataUser',  JSON.stringify(this.resp.data));
           this.router.navigate(['/ModuloBecas']);
         }else{
           console.log(this.resp.msg);
         }
      },
      (error) => {

        console.log(error);
      }
    );
  }

}
