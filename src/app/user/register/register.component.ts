import { Component, OnInit, OnDestroy, ElementRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { Subject } from 'rxjs/Subject'
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

import { UserService } from '../../services/user.service'
import { UrlService } from '../../services/url.service'
import { Url } from '../../models/url'

declare let $ : any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registers : Url[] = []
  public registersBackup : Url[] = []
  public componentDestroyed: Subject<boolean> = new Subject();
  public p : number = 1 // paginación
  public isLoading: Boolean = true

  constructor(private _userService : UserService, 
              private _urlService: UrlService, 
              private _ele: ElementRef,
              vcr: ViewContainerRef, 
              public toaster : ToastsManager) 
            {
              this.toaster.setRootViewContainerRef(vcr) 
            }

  ngOnInit() {

    this.initView()
  }

  public initView()
  {
    const urlFetched = this._userService.urlStored()

    Observable.forkJoin(urlFetched)
    .takeUntil(this.componentDestroyed)
    .subscribe(res => {
      this.registers = res[0]
      this.registersBackup = res[0]
      this.isLoading = false
    }, err => {
      err = err.json()
      this.toaster.error(`${err.message}`,'Error!')
      this.isLoading = false
    })
  }

  public filterRegisters(e)
  {
    // filtrar registros de acuerdo al parametro de busqueda typeado en el input
    const query = e.target.value
    console.log(query)
    if(query)
    {
      
      this.registers = this.registers.filter(i => {
          return i.original_url.indexOf(query) !== -1 || i.short_url.indexOf(query) !== -1 || i.createdAt.indexOf(query) !== -1
      })

    }
    else
    {
      
      this.registers = this.registersBackup
    }
      
  }

  public deleteRegister(url: Url)
  {
    const agree = confirm('Esta seguro de querer borrar este registro?')
    
    if(agree)
    {
      this.isLoading = true
      this._urlService.deleteRegister(url).subscribe(res => {

        this.registers = this.registers.filter(i => i.id !== url.id)
        this.isLoading = false
      }, err => {
        err = err.json()
        this.toaster.error(`${err.message}`,'Error!')
        this.isLoading = false
      })
    }
      
  }

  public convertUrl()
  {
    const url = this._ele.nativeElement.querySelector('#url_input').value

    if(url)
    {
      this.isLoading = true
      const object = {url}

      this._urlService.convertUrlUser(object).subscribe(res => {

          this.isLoading = false
          this.initView()
          this.toaster.success(`Su url ha sido convertida`, 'Éxito!');
          
          $('#parrafo_url').text('Su url es: '+res.url).show('slow/400/fast')
          this._ele.nativeElement.querySelector('#url_input').value = ''

      }, err => {
         
         err = err.json()
         this.toaster.error(`${err.message}`,'Error!')
         this._ele.nativeElement.querySelector('#url_input').value = ''
         this.isLoading = false

      })  
    }
    else
    {
      this.toaster.warning(`Debe introducir una url`, 'Alerta!');
    }
      
  }

  public showDivHide()
  {
    $('#url_input').val('')
    $('#div_oculto').show('slow/400/fast')
    $('#div_datos').hide('slow/400/fast')
  }

  public showDataDiv() {
    $('#div_oculto').hide('slow/400/fast')
    $('#div_datos').show('slow/400/fast')
    $('#parrafo_url').hide()
  }

  	ngOnDestroy(): void {
  		this.componentDestroyed.next(true);
  		this.componentDestroyed.complete();  
	}

}
