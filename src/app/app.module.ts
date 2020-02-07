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


// Echarts
import { NgxEchartsModule } from 'ngx-echarts';
import { FormRegistroComponent } from './registro/form-registro/form-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponentComponent,
    MenuPrincipalComponent,
    BecasSubesComponent,
    FormRegistroComponent
  ],
  imports: [
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
    FileUploadModule

  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})

export class AppModule { }

