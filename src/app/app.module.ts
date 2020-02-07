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
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MainComponentComponent } from './main-component/main-component.component';
import { MenuPrincipalComponent } from './main-component/menu-principal/menu-principal.component';
import { BecasSubesComponent } from './main-component/becas-subes/becas-subes.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {InplaceModule} from 'primeng/inplace';
import {TreeModule} from 'primeng/tree';
import {FileUploadModule} from 'primeng/fileupload';
import { BlockUIModule } from 'ng-block-ui';
// Echarts
import { NgxEchartsModule } from 'ngx-echarts';

import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { MenuMainComponent } from './Menu/menu-main/menu-main.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponentComponent,
    MenuPrincipalComponent,
    BecasSubesComponent,
    MenuMainComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ConfirmDialogModule,
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
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
    NoopAnimationsModule

  ],
  providers: [FormBuilder, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
