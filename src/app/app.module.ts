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
import { SaveProductoComponent } from './pages/save-producto/save-producto.component';

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
 		SaveProductoComponent,
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
