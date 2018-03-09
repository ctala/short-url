import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

import { HomeRoutes } from './home.routes'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { UserService } from '../services/user.service'
import { HttpService } from '../services/http.service'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    HttpModule,
    ReactiveFormsModule,
    LoadingModule
  ],
  declarations: [DashboardComponent],
  providers: [
  	HttpService
  ]
})
export class HomeModule { }
