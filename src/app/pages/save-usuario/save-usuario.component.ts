import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';

import {Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
	selector: 'app-save-usuario',
	templateUrl: './save-usuario.component.html',
	styleUrls: ['./save-usuario.component.css']
})
export class SaveUsuarioComponent extends BaseComponent implements OnInit {

	usuario:Usuario	= {};


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];


	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_usuario = parseInt( params.get('id') );
			let session = this.rest.getUsuarioSesion();

				this.is_loading = true;
				if( id_usuario )
				{
					forkJoin({
						usuario : this.rest.usuario.get( id_usuario),

					})
					.subscribe((responses)=>
					{
						this.usuario= responses.usuario;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.usuario.id_organizacion = session.id_organizacion;
					this.usuario.id_sucursal = session.id_sucursal;

					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.usuario.id	)
		{
			this.rest.usuario.update( this.usuario ).subscribe((usuario)=>{
				this.is_loading = false;
				this.router.navigate(['/list-usuario']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.usuario.create( this.usuario ).subscribe((usuario)=>{
				this.is_loading = false;
				this.router.navigate(['/list-usuario']);
			},(error)=>this.showError(error));
		}
	}
}
