import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs/Subscription';
import { Subject }    from 'rxjs/Subject'
import { Router } from '@angular/router'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

	public access : Boolean = false
  public subscriptionAccess: Subscription;

  constructor(private _userService: UserService, public toaster : ToastsManager, vcr: ViewContainerRef,private _router : Router )
  {
    this.toaster.setRootViewContainerRef(vcr)
    const token = localStorage.getItem('token')
    if(token)
    {
    	this.access = true
    }

    this.subscriptionAccess = this._userService.accessAttemp$.subscribe(state => {
      if(state)
      {
        const token = localStorage.getItem('token')
        this.access = token ? true : false
      }
      else
      {
         console.log('aqui navBar refresh')
      }
    })
  }

  ngOnInit()
  {

  }


  public logout(e)
  {
    e.preventDefault()
    localStorage.clear()
    this.access = false
    this.toaster.success('Ha cerrado sesión correctamente','Exito!')
    setTimeout(() => {

      this._router.navigate(['/home'])
      
    },500)
  }
}