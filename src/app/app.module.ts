import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AccessModule } from './modules/access/access.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDateHttpInterceptor } from './services/AngularDateHttpInterceptor'
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SaveUsuarioComponent} from './pages/save-usuario/save-usuario.component';
import {ListUsuarioComponent} from './pages/list-usuario/list-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import {ToastErrorComponent } from './components/toast-error/toast-error.component';
import { BaseComponent } from './pages/base/base.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListOrganizacionComponent } from './pages/list-organizacion/list-organizacion.component';
import { SaveOrganizacionComponent } from './pages/save-organizacion/save-organizacion.component';
import { ListSucursalComponent } from './pages/list-sucursal/list-sucursal.component';
import { SaveSucursalComponent } from './pages/save-sucursal/save-sucursal.component';
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component';
import { SaveClienteComponent } from './pages/save-cliente/save-cliente.component';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';
import { SaveProveedorComponent } from './pages/save-proveedor/save-proveedor.component';
import { ListCotizacionComponent } from './pages/list-cotizacion/list-cotizacion.component';
import { SaveCotizacionComponent } from './pages/save-cotizacion/save-cotizacion.component';
import { ListServicioComponent } from './pages/list-servicio/list-servicio.component';
import { SaveServicioComponent } from './pages/save-servicio/save-servicio.component';
import { ListServicioCategoriaComponent } from './pages/list-servicio-categoria/list-servicio-categoria.component';
import { SaveServicioCategoriaComponent } from './pages/save-servicio-categoria/save-servicio-categoria.component';
import { ListUnidadDeMedidaComponent } from './pages/list-unidad-de-medida/list-unidad-de-medida.component';
import { SaveUnidadDeMedidaComponent } from './pages/save-unidad-de-medida/save-unidad-de-medida.component';
import { ViewCotizacionComponent } from './pages/view-cotizacion/view-cotizacion.component';
@NgModule({
	declarations: [
		AppComponent,
		SaveUsuarioComponent,
		ListUsuarioComponent,
		HomeComponent,
 		DashboardComponent,
 		LoginComponent,
 		HeaderComponent,
		LoadingComponent,
		ToastErrorComponent,
 		BaseComponent,
 		ModalComponent,
 		PaginationComponent,
		MenuComponent,
		ListOrganizacionComponent,
		SaveOrganizacionComponent,
		ListSucursalComponent,
		SaveSucursalComponent,
		ListClienteComponent,
		SaveClienteComponent,
		ListProveedorComponent,
		SaveProveedorComponent,
		ListCotizacionComponent,
		SaveCotizacionComponent,
		ListServicioComponent,
		SaveServicioComponent,
		ListServicioCategoriaComponent,
		SaveServicioCategoriaComponent,
		ListUnidadDeMedidaComponent,
		SaveUnidadDeMedidaComponent,
		ViewCotizacionComponent,
			],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AccessModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		NgxCsvParserModule,
		NgxChartsModule,

	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AngularDateHttpInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }
