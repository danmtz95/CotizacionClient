import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/RestModels';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}
	title = 'CotizacionManager';
	show_logout: boolean = false;
	usuario: Usuario;
	menu = false;
	ngOnInit() {
		this.usuario = this.rest.getUsuarioSesion();

	}

	openNav() {

		if (this.menu == false) {
			document.getElementById("accordionSidebar").style.position = "absolute";
			document.getElementById("accordionSidebar").style.zIndex = "-1";
			this.menu = true;
		} else {
			document.getElementById("accordionSidebar").style.position = "relative";
			document.getElementById("accordionSidebar").style.zIndex = "1";
			this.menu = false;
		}



		// document.getElementById("sidebarToggleTop").style.marginLeft = "250px";
	}
	logout() {
		// remove user from local storage and set current user to null
		localStorage.clear();
		this.show_logout = false
		// localStorage.removeItem('usuario');
		// localStorage.removeItem('session_token');
		// localStorage.removeItem('id_organizacion');
		this.rest.currentUserSubject.next(null);
		this.router.navigate(['/login']);
	}

}
