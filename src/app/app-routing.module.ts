import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { AuthGuard } from 'src/app/classes/auth.guard'


import { SaveUsuarioComponent } from './pages/save-usuario/save-usuario.component'
import { ListUsuarioComponent } from './pages/list-usuario/list-usuario.component'

import { HomeComponent } from './pages/home/home.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './pages/login/login.component'
import { ListProductoComponent } from './pages/list-producto/list-producto.component'


const routes: Routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-producto', component: ListProductoComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-producto', component: ListProductoComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-usuario', component: ListUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-usuario', component: SaveUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-usuario/:id', component: SaveUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			//			,{ path:'list-transfer/:id' , component: ListTransferComponent, pathMatch: 'full',canActivate:[AuthGuard] }

		],
	},
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			useHash: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
