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
import { ListCotizacionComponent } from './pages/list-cotizacion/list-cotizacion.component'
import { SaveCotizacionComponent } from './pages/save-cotizacion/save-cotizacion.component'
import { ListServicioCategoriaComponent } from './pages/list-servicio-categoria/list-servicio-categoria.component'
import { SaveServicioCategoriaComponent } from './pages/save-servicio-categoria/save-servicio-categoria.component'
import { ListUnidadDeMedidaComponent } from './pages/list-unidad-de-medida/list-unidad-de-medida.component'
import { SaveUnidadDeMedidaComponent } from './pages/save-unidad-de-medida/save-unidad-de-medida.component'
import { ViewCotizacionComponent } from './pages/view-cotizacion/view-cotizacion.component'


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
			{ path: 'list-cotizacion', component: ListCotizacionComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-cotizacion', component: SaveCotizacionComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-cotizacion/:id', component: SaveCotizacionComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-servicio-categoria', component: ListServicioCategoriaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-servicio-categoria', component: SaveServicioCategoriaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-servicio-categoria/:id', component: SaveServicioCategoriaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'list-unidad-de-medida', component: ListUnidadDeMedidaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'add-unidad-de-medida', component: SaveUnidadDeMedidaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'edit-unidad-de-medida/:id', component: SaveUnidadDeMedidaComponent, pathMatch: 'full', canActivate: [AuthGuard], },
			{ path: 'ver-cotizacion/:id', component: ViewCotizacionComponent, pathMatch: 'full', canActivate: [AuthGuard], },
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
