import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from './shared/navbar/navbar.module'
import { FooterModule } from './shared/footer/footer.module'

import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { AppRoutes } from './app.routes'

import { LayoutComponent } from './layout/layout.component';

import { AppComponent } from './app.component';

import { HttpService } from './services/http.service'
import { UserService } from './services/user.service';
import { UrlService } from './services/url.service';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    ReactiveFormsModule,
    NavbarModule,
    FooterModule,
  ],
  providers: [HttpService, UserService, UrlService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
