import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Unidad_De_Medida, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
  selector: 'app-save-unidad-de-medida',
  templateUrl: './save-unidad-de-medida.component.html',
  styleUrls: ['./save-unidad-de-medida.component.css']
})
export class SaveUnidadDeMedidaComponent extends BaseComponent implements OnInit {

	unidad_de_medida:Unidad_De_Medida	= {};


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];


	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_unidad_de_medida = parseInt( params.get('id') );
			let session = this.rest. getUsuarioSesion();
				this.is_loading = true;
				if( id_unidad_de_medida )
				{
					forkJoin({
						unidad_de_medida : this.rest.unidad_de_medida.get( id_unidad_de_medida ),
					})
					.subscribe((responses)=>
					{
						this.unidad_de_medida= responses.unidad_de_medida;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.unidad_de_medida.id_organizacion = session.id_organizacion;
					this.unidad_de_medida.id_sucursal = session.id_sucursal;
					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.unidad_de_medida.id	)
		{
			this.rest.unidad_de_medida.update( this.unidad_de_medida ).subscribe((unidad_de_medida)=>{
				this.is_loading = false;
				this.router.navigate(['/list-unidad-de-medida']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.unidad_de_medida.create( this.unidad_de_medida ).subscribe((unidad_de_medida)=>{
				this.is_loading = false;
				this.router.navigate(['/list-unidad-de-medida']);
			},(error)=>this.showError(error));
		}
	}
}
