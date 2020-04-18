import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {CardModule} from 'primeng/card';
import { HeaderComponent } from './header/header.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainComponentComponent } from './main-component/main-component.component';
import { MenuPrincipalComponent } from './main-component/menu-principal/menu-principal.component';
import { BecasSubesComponent } from './main-component/becas-subes/becas-subes.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {InplaceModule} from 'primeng/inplace';
import {TreeModule} from 'primeng/tree';
import {FileUploadModule} from 'primeng/fileupload';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DropdownModule} from 'primeng/dropdown';

import {MenuItem} from 'primeng/api';
import { MenuMainComponent } from './Menu/menu-main/menu-main.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaComponent } from './main-component/tabla/tabla.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import {FieldsetModule} from 'primeng/fieldset';
import { TableModule } from 'primeng/table';


import { BlockUIModule } from 'ng-block-ui';
// Echarts
import { NgxEchartsModule } from 'ngx-echarts';
import { FormRegistroComponent } from './registro/form-registro/form-registro.component';

import { StepsModule } from 'primeng/steps';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponentComponent,
    MenuPrincipalComponent,
    BecasSubesComponent,
    FormRegistroComponent,
    MenuMainComponent,
    TablaComponent
    ],
  imports: [
    BrowserAnimationsModule,
    ConfirmDialogModule,
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    ToggleButtonModule,
    DropdownModule,
    PasswordModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    MessagesModule,
    MessageModule,
    ToastModule,
    InplaceModule,
    TreeModule,
    FileUploadModule,
    NgxEchartsModule,
    StepsModule,
    BlockUIModule.forRoot(),
    NoopAnimationsModule,
    FormsModule,
    CommonModule,
    DialogModule,
    FieldsetModule,
    TableModule,
    

  ],
  providers: [FormBuilder, ConfirmationService],
  bootstrap: [AppComponent]
})

export class AppModule { }

