import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component'
import { UserService } from '../../services/user.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: []
})
export class NavbarModule { 
}
