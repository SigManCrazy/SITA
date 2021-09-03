import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes =[
  {
    path: '',
    component: LoginComponent,
    loadChildren: () => import('./layouts/login-layout/login-layout.module').then(m => m.LoginLayoutModule)
  },
  {
    path: 'app',
    component: AdminLayoutComponent,
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'signup',
    component: SignUpComponent,
    loadChildren: () => import('./layouts/signup-layout/signup-layout.module').then(m => m.SignupLayoutModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
