import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';


export const AppRoutes: Routes = [
{
	path: '',
    redirectTo: 'home',
    pathMatch: 'full',
},{
	path: '',
    component: LayoutComponent,
    children: [
    {
    	path: '',
    	loadChildren: './home/home.module#HomeModule'
    },{
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }]
}]