import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard.component'

export const HomeRoutes : Routes = [{
	path: '',
    children: [{
      path: 'home',
      component: DashboardComponent,
    }]
}]