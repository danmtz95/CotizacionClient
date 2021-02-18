import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Sucursal, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';

@Component({
  selector: 'app-save-sucursal',
  templateUrl: './save-sucursal.component.html',
  styleUrls: ['./save-sucursal.component.css']
})
export class SaveSucursalComponent extends BaseComponent implements OnInit {

    sucursal:Sucursal	= {};


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];


	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_cliente = parseInt( params.get('id') );
			let session = this.rest. getUsuarioSesion();
				this.is_loading = true;
				if( id_cliente )
				{
					forkJoin({
						sucursal : this.rest.sucursal.get( id_cliente ),
					})
					.subscribe((responses)=>
					{
						this.sucursal= responses.sucursal;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.sucursal.id_organizacion = session.id_organizacion;
					// this.cliente.id_sucursal = session.id_sucursal;
					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.sucursal.id	)
		{
			this.rest.sucursal.update( this.sucursal ).subscribe((sucursal)=>{
				this.is_loading = false;
				this.router.navigate(['/list-sucursal']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.sucursal.create( this.sucursal ).subscribe((sucursal)=>{
				this.is_loading = false;
				this.router.navigate(['/list-sucursal']);
			},(error)=>this.showError(error));
		}
	}
}
