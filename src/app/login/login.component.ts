import { Component, OnInit } from '@angular/core';

// import para form
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService} from '../Service/login-service.service';

// DTO
import {LoginDTO} from '../DTO/LoginDTO';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  // Variabler globales form
  constructor(private form: FormBuilder) {

    //  creamos el Form
    this.checkoutForm = this.form.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }



}
