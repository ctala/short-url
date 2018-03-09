import { Routes } from '@angular/router'

import { ListComponent } from './list.component'
import { RegisterComponent } from './register/register.component'
import { AuthService } from '..//services/auth.service';

export const UserRoutes : Routes = [{

	path: '',
	component: ListComponent,
	children:[{
		path: '',
		redirectTo: 'registers',
		canActivate: [AuthService] 
	},{
		path:'registers',
		component: RegisterComponent,
		canActivate: [AuthService] 
	}]

}]