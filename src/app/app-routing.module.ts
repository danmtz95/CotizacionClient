import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { AuthGuard } from 'src/app/classes/auth.guard'
import { SaveUsuarioComponent } from './pages/save-usuario/save-usuario.component'
import { ListUsuarioComponent } from './pages/list-usuario/list-usuario.component'
import { HomeComponent } from './pages/home/home.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './pages/login/login.component'
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component'
import { SaveClienteComponent } from './pages/save-cliente/save-cliente.component'
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component'
import { SaveProveedorComponent } from './pages/save-proveedor/save-proveedor.component'
import { ListServicioComponent } from './pages/list-servicio/list-servicio.component'
import { SaveServicioComponent } from './pages/save-servicio/save-servicio.component'


const routes: Routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-usuario', component: ListUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-usuario', component: SaveUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-usuario/:id', component: SaveUsuarioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-cliente', component: ListClienteComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-cliente', component: SaveClienteComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-cliente/:id', component: SaveClienteComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-proveedor', component: ListProveedorComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-proveedor', component: SaveProveedorComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-proveedor/:id', component: SaveProveedorComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-servicio', component: ListServicioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-servicio', component: SaveServicioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-servicio/:id', component: SaveServicioComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			//			,{ path:'list-transfer/:id' , component: ListTransferComponent, pathMatch: 'full',canActivate:[AuthGuard] }

		],
	},
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true,
    relativeLinkResolution: 'legacy'
}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
