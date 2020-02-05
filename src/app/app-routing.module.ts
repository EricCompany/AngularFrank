import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {MainComponentComponent} from './main-component/main-component.component';
import {MenuPrincipalComponent} from './main-component/menu-principal/menu-principal.component';
import {BecasSubesComponent} from './main-component/becas-subes/becas-subes.component';

const routes: Routes = [
  {path: 'ITC', component: AppComponent, children: [

    ]},
  {path: '', component: LoginComponent},
  {path: 'ModuloBecas', component: MainComponentComponent, children: [
      {path: '', component: MenuPrincipalComponent},
      {path: 'BecasSubes', component: BecasSubesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
