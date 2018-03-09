import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx'
import { Url } from '../models/url'

@Injectable()
export class UrlService {

  constructor(private _http: HttpService) { }

  private handleError(error: any) { 
    return Observable.throw(error);
  }

  public convertUrl(valor) : Observable<any>{
  	return this._http.post(`${environment.api_url}/transform-url`,valor).map(res => res.json()).catch(this.handleError)
  }

  public convertUrlUser(valor) : Observable<any>{
  	return this._http.post(`${environment.api_url}/transform-url/user`,valor).map(res => res.json()).catch(this.handleError)
  }

  public deleteRegister(url: Url)
  {
  	return this._http.delete(`${environment.api_url}/delete-url/${url.id}`).map(res => res.json()).catch(this.handleError)
  }


}
