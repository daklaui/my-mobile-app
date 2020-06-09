import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DetailleOffreComponent } from './detaille-offre/detaille-offre.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
  { path: 'login', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Detaille/:id', component: DetailleOffreComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
