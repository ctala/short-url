import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import {NgxPaginationModule} from 'ngx-pagination';
import { LoadingModule } from 'ngx-loading';

import { ListComponent } from './list.component';
import { RegisterComponent } from './register/register.component';

import { UserRoutes } from './user.routing'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    NgxPaginationModule,
    LoadingModule
  ],
  declarations: [ListComponent, RegisterComponent]
})
export class UserModule { }
