import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Proveedor, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';

@Component({
  selector: 'app-save-proveedor',
  templateUrl: './save-proveedor.component.html',
  styleUrls: ['./save-proveedor.component.css']
})
export class SaveProveedorComponent extends BaseComponent implements OnInit {

	proveedor:Proveedor	= {};
	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];
	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_proveedor = parseInt( params.get('id') );
			let session = this.rest. getUsuarioSesion();
				this.is_loading = true;
				if( id_proveedor )
				{
					forkJoin({
						proveedor : this.rest.proveedor.get( id_proveedor ),
					})
					.subscribe((responses)=>
					{
						this.proveedor= responses.proveedor;
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.proveedor.id_organizacion = session.id_organizacion;
					this.is_loading = false;
				}

		});
	}

	save()
	{
		this.is_loading = true;

		if( this.proveedor.id	)
		{
			this.rest.proveedor.update( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/list-proveedor']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.proveedor.create( this.proveedor ).subscribe((proveedor)=>{
				this.is_loading = false;
				this.router.navigate(['/list-proveedor']);
			},(error)=>this.showError(error));
		}
	}

}
