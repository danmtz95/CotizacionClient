import {
	Component,
	OnInit,
	AfterContentInit,
	AfterViewInit,
	OnDestroy
} from '@angular/core';

import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

	constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
		super(rest, router, route, location, titleService);
	}

	ngOnInit() {

		// this.centro_medico = this.rest.getCurrentCentroMedico()
		this.route.params.subscribe(params => {
			if (this.rest.getUsuarioSesion() != null) {
				this.router.navigate(['/dashboard'])
			}
		})
	}

	usuario: string = '';
	contrasena: string = '';
	is_loading: boolean = false;
	centro_medico;
	doLoginKeyboard(evt: KeyboardEvent) {
		if (evt.keyCode == 13)
			this.doLogin();
	}

	doLogin() {
		this.is_loading = true;
		this.rest.doLogin(this.usuario, this.contrasena).subscribe(
			response => {
				this.is_loading = false;
					this.router.navigate(['/dashboard']);
				//this.restService.callMethodGet('/assets/data.json',{foo:'yes'}).subscribe((response)=>
			}, error => this.showError(error));
	}

}
