import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  canActivate()
  {
  	const identity = localStorage.getItem('token')

  	if(identity)
  	{
  		return true
  	}
  	else
  	{
  		this.router.navigate(['/home']);
      	return false;
  	}
  }

}
