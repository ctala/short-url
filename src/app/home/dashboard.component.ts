import { Component, OnInit, OnDestroy, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Rx'
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

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

  constructor(public toaster : ToastsManager,
              private _urlService: UrlService, 
              private _ele : ElementRef, 
              vcr: ViewContainerRef, 
              private _fb: FormBuilder,
              private _userService: UserService) 
  {
    this.toaster.setRootViewContainerRef(vcr)
    this.initForm()
    this.initFormRegistrar()
  }

  ngOnInit() {

    this.identity = JSON.parse(localStorage.getItem('identity'))
  }

  public transFormUrl()
  {
  	const url = this._ele.nativeElement.querySelector('#url_input').value

  	if(url)
  	{
  		const object = {url}
      this.isLoading = true

      if(this.identity)
      {
        this._urlService.convertUrlUser(object).subscribe(res => {

            this.toaster.success(`su url es ${res.url}`, 'Éxito!');
            this.isLoading = false

        }, err => {
           
          err = err.json()
          this.toaster.error(`${err.message}`,'Error!')
          this._ele.nativeElement.querySelector('#url_input').value = ''
          this.isLoading = false

        })
      }
      else
      {
        this._urlService.convertUrl(object).subscribe(res => {

            this.toaster.success(`su url es ${res.url}`, 'Éxito!');
            this.isLoading = false
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

    }, err => {
      err = err.json()
      this.toaster.error(`${err.message}`,'Error!')
      this.isLoading = false
      this.initForm()
    })
  }

  onSubmitRegistrar(user: User)
  {

    this.isLoading = true

    this._userService.singUp(user).subscribe( res => {

      const user = JSON.stringify(res.user)
      
      localStorage.setItem('identity',user)
      localStorage.setItem('token',res.token)

      this._userService.updateAccess(true)
      this.initFormRegistrar()
      this.isLoading = false

      this.toaster.success(`Se ha registrado correctamente`,'Éxito!')

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
