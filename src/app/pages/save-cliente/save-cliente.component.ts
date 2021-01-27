import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
  selector: 'app-save-cliente',
  templateUrl: './save-cliente.component.html',
  styleUrls: ['./save-cliente.component.css']
})
export class SaveClienteComponent extends BaseComponent implements OnInit {

	cliente:Cliente	= {};


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
						cliente : this.rest.cliente.get( id_cliente ),
					})
					.subscribe((responses)=>
					{
						this.cliente= responses.cliente;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.cliente.id_organizacion = session.id_organizacion;
					this.cliente.id_sucursal = session.id_sucursal;
					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.cliente.id	)
		{
			this.rest.cliente.update( this.cliente ).subscribe((cliente)=>{
				this.is_loading = false;
				this.router.navigate(['/list-cliente']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.cliente.create( this.cliente ).subscribe((cliente)=>{
				this.is_loading = false;
				this.router.navigate(['/list-cliente']);
			},(error)=>this.showError(error));
		}
	}
}
