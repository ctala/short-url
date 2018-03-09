import { Component, OnInit, OnDestroy, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Rx'
import { ToastsManager } from 'ng2-toastr/ng2-toastr'
import { Router } from '@angular/router'

import { UrlService } from '../services/url.service'
import { UserService } from '../services/user.service'

import { Url } from '../models/url'
import { User } from '../models/users'

declare var $ : any; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

	public componentDestroy : Subject<boolean> = new Subject(); 
	public userLoggued: Boolean
  public form: FormGroup
  public formRegistrar: FormGroup
  public identity: any
  public errors : any
  public isLoading: Boolean = false

  constructor(public toaster : ToastsManager, // toaster de avisos
              private _urlService: UrlService, // servicio de url
              private _ele : ElementRef, 
              vcr: ViewContainerRef, 
              private _fb: FormBuilder,
              private _userService: UserService,
              private _router: Router) 
  {
    this.toaster.setRootViewContainerRef(vcr)
    this.initForm()
    this.initFormRegistrar()
  }

  ngOnInit() {

    // variables que se guarda en el localStorage si el user esta loggueado

    this.identity = JSON.parse(localStorage.getItem('identity')) 
  }

  public transFormUrl()
  {
    // función para transformar las url 
  	const url = this._ele.nativeElement.querySelector('#url_input').value

  	if(url)
  	{
  		const object = {url}
      this.isLoading = true

      if(this.identity)
      {
        // si existe la sesion
        this._urlService.convertUrlUser(object).subscribe(res => {

            this.toaster.success(`Su url ha sido transformada`, 'Éxito!');
            this.isLoading = false
            this._ele.nativeElement.querySelector('#url_input').value = res.url

        }, err => {
           
          err = err.json()
          this.toaster.error(`${err.message}`,'Error!')
          this._ele.nativeElement.querySelector('#url_input').value = ''
          this.isLoading = false

        })
      }
      else
      {
        // sin sesion
        this._urlService.convertUrl(object).subscribe(res => {

            this.toaster.success(`Su url ha sido transformada`, 'Éxito!');
            this.isLoading = false
            this._ele.nativeElement.querySelector('#url_input').value = res.url
            
        }, err => { 
          err = err.json()
          this.toaster.error(`${err.message}`,'Error!')
          this._ele.nativeElement.querySelector('#url_input').value = ''
          this.isLoading = false

        })
      }
    		
  	}
  	else
  	{
  		this.toaster.warning(`Debe introducir una url`, 'Alerta!');
  	}
  }



  public initForm(){
    this.form = this._fb.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  public initFormRegistrar()
  {
    this.formRegistrar = this._fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit(user: User)
  {

    // función para el loggueo
    this.isLoading = true

    this._userService.login(user).subscribe( res => {

      const user = JSON.stringify(res.user)
      localStorage.setItem('identity',user)
      localStorage.setItem('token',res.token)

      this._userService.updateAccess(true)
      this.initForm()
      $('#modal_login').modal('hide')
      this.isLoading = false
      
      this.toaster.success(`Ha iniciado sesión correctamente`,'Éxito!')

      setTimeout(() => {

        this._router.navigate(['/user'])
      
      },500)


    }, err => {
      err = err.json()
      this.toaster.error(`${err.message}`,'Error!')
      this.isLoading = false
      this.initForm()
    })
  }

  onSubmitRegistrar(user: User)
  {

    // función para el registro

    this.isLoading = true

    this._userService.singUp(user).subscribe( res => {

      const user = JSON.stringify(res.user)
      
      localStorage.setItem('identity',user)
      localStorage.setItem('token',res.token)

      this._userService.updateAccess(true)
      this.initFormRegistrar()
      this.isLoading = false
      this.toaster.success(`Se ha registrado correctamente`,'Éxito!')
      $('#modal_registrar').modal('hide')
      
      setTimeout(() => {

        this._router.navigate(['/user'])
      
      },500)


    }, err => {
      err = err.json()
      this.toaster.error(`${err.message}`,'Error!')
      this.isLoading = false
      this.initFormRegistrar()
    })
  }

  ngOnDestroy(){
  	this.componentDestroy.next(true);
	  this.componentDestroy.complete();
  }

}
