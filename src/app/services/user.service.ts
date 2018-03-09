import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { User } from '../models/users'
import { Url } from '../models/url'


@Injectable()
export class UserService {

  // subscripción para actualizar la sesion del usuario 
	public _accessSubscribe	= new BehaviorSubject<Boolean>(null)
	accessAttemp$ = this._accessSubscribe.asObservable()

  constructor(private _http: HttpService) { }

  private handleError(error: any) { 
    return Observable.throw(error);
  }


  public updateAccess(state: Boolean)
  {
  	this._accessSubscribe.next(state)
  }

  public login(user: User) : Observable<any>{
  	
  	return this._http.post(`${environment.api_url}/login`,user).map(res => res.json()).catch(this.handleError)
  }

  public singUp(user: User){
  	
  	return this._http.post(`${environment.api_url}/singUp`,user).map(res => res.json())
    .catch(this.handleError);
  }

  public urlStored() : Observable<Url[]>
  {
    return this._http.get(`${environment.api_url}/user/url`).map(res => res.json()).catch(this.handleError)
  }
  
}
