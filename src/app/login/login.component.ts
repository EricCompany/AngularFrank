import { Component, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card';
// import para form
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService} from '../Service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  // Variabler globales form
  constructor(private form: FormBuilder, private http: LoginServiceService) {

    //  creamos el Form
    this.checkoutForm = this.form.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }
  login(){
    this.http.login(this.checkoutForm.value).subscribe(value => {
      console.log(value);
    })
    console.log(this.checkoutForm.value);
  }

}
