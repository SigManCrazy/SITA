import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupLayoutRoutingModule } from './signup-layout-routing.module';
import { SignupLayoutComponent } from './signup-layout/signup-layout.component';


@NgModule({
  declarations: [
    SignupLayoutComponent
  ],
  imports: [
    CommonModule,
    SignupLayoutRoutingModule
  ]
})
export class SignupLayoutModule { }
