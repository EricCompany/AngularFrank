import { Component, OnInit } from '@angular/core';

// import para form
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService} from '../Service/login-service.service';
import {ResponseDTO} from '../DTO/ResponseDTO';
// DTO
import {LoginDTO} from '../DTO/LoginDTO';
import { Router } from '@angular/router';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

// Block
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {
  checkoutForm;
  resp: ResponseDTO;
  msgs: Message[] = [];

  @BlockUI() blockUI: NgBlockUI;

  // Variabler globales form
  constructor( private messageService: MessageService, private form: FormBuilder, private http: LoginServiceService, private router: Router) {

    //  creamos el Form
    this.checkoutForm = this.form.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
  }

  login() {
    this.blockUI.start('Comprobando Informacion...'); // Start blocking

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
           this.msgs = [];
           this.msgs.push({severity: 'error', summary: this.resp.msg, detail: 'PrimeNG rocks'});
           // console.log();
         }
        this.blockUI.stop();
      },
      (error) => {

        console.log(error);
        this.blockUI.stop();
      }
    );
  }

}
