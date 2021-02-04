import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Servicio_Categoria, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
  selector: 'app-save-servicio-categoria',
  templateUrl: './save-servicio-categoria.component.html',
  styleUrls: ['./save-servicio-categoria.component.css']
})
export class SaveServicioCategoriaComponent extends BaseComponent implements OnInit {

	servicio_categoria:Servicio_Categoria	= {};


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];


	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_servicio_categoria = parseInt( params.get('id') );
			let session = this.rest. getUsuarioSesion();
				this.is_loading = true;
				if( id_servicio_categoria )
				{
					forkJoin({
						servicio_categoria : this.rest.servicio_categoria.get( id_servicio_categoria ),
					})
					.subscribe((responses)=>
					{
						this.servicio_categoria= responses.servicio_categoria;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.servicio_categoria.id_organizacion = session.id_organizacion;
					this.servicio_categoria.id_sucursal = session.id_sucursal;
					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.servicio_categoria.id	)
		{
			this.rest.servicio_categoria.update( this.servicio_categoria ).subscribe((servicio_categoria)=>{
				this.is_loading = false;
				this.router.navigate(['/list-servicio-categoria']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.servicio_categoria.create( this.servicio_categoria ).subscribe((servicio_categoria)=>{
				this.is_loading = false;
				this.router.navigate(['/list-servicio-categoria']);
			},(error)=>this.showError(error));
		}
	}
}
