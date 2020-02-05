import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {CardModule} from 'primeng/card';
import { HeaderComponent } from './header/header.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MainComponentComponent } from './main-component/main-component.component';
import { MenuPrincipalComponent } from './main-component/menu-principal/menu-principal.component';
import { BecasSubesComponent } from './main-component/becas-subes/becas-subes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponentComponent,
    MenuPrincipalComponent,
    BecasSubesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
