import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../services/Rest';
import { Router,ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { StringDictionary } from '../../models/models';


import {Servicio_Categoria, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
  selector: 'app-list-servicio-categoria',
  templateUrl: './list-servicio-categoria.component.html',
  styleUrls: ['./list-servicio-categoria.component.css']
})
export class ListServicioCategoriaComponent extends BaseComponent implements OnInit {

	TEMPLATE_HEADERS_SIZE = 10;
	file:File = null;
	show_import:boolean = false;
	servicio_categoria_search:SearchObject<Servicio_Categoria> = { };
	search_extra:StringDictionary<string> = { };
	servicio_categoria_list:Servicio_Categoria[] = [];


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];

	ngOnInit()
	{
		this.path = '/list-servicio_categoria';
		this.route.queryParams.subscribe( params =>
		{
			this.servicio_categoria_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
				start: {}
			};


			this.servicio_categoria_search.limit = this.pageSize;

			this.titleService.setTitle('servicio_categoria');

			let keys = ['eq','le','lt','ge','gt','csv','lk'];
			let fields = [ "id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion" ]

			keys.forEach((k)=>
			{
				fields.forEach((f)=>
				{
					let field = k+"."+f;

					if( params[field ] )
					{
						this.servicio_categoria_search[ k ][ f ] = params[field] === 'null' ? null : params[ field ];
					}
					else
					{
						this.servicio_categoria_search[ k ][ f ] = null;
					}
				});
			});


			/*
			let extra_keys = ['parameter_extra_1','parameter_extra_2'];
			extra_keys.forEach(i=>
			{
				if( params[ 'search_extra.'+i ] )
				{
					this.search_extra[ i ] = params['search_extra.'+i ] === 'null' ? null : params[ 'search_extra.'+i ];
				}
				else
				{
					this.search_extra[ i ] = null;
				}
			});
			*/

			console.log('Search', this.servicio_categoria_search);

			this.is_loading = true;
			this.servicio_categoria_search.page =	'page' in params ? parseInt( params.page ) : 0;
			this.currentPage = this.servicio_categoria_search.page;


			this.is_loading = true;
			forkJoin({
				servicio_categoria : this.rest.servicio_categoria.search(this.servicio_categoria_search),
				// imagen : this.rest.imagen.search({})
			})
			.subscribe((responses)=>
			{
				this.servicio_categoria_list = responses.servicio_categoria.data;
				this.setPages( this.servicio_categoria_search.page, responses.servicio_categoria.total );
				// this.imagen_list = responses.imagen.data;
				this.is_loading = false;
			},(error)=>this.showError(error));

		});
	}

	onFileChanged(event)
	{
		if (event.target.files.length)
		{
			this.file = event.target.files[0];
		}
	}

	uploadFile()
	{
		this.is_loading = true;
		this.rest.xlsx2json( this.file,["id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion"]).then((json)=>
		{
			//Filter json then upload
			this.rest.servicio_categoria.batchUpdate(json).subscribe((result)=>
			{
				if( this.servicio_categoria_list.length == 0 )
				{
					this.setPages( 0, result.length );
					this.servicio_categoria_list = result.slice(0,this.pageSize);
				}
				this.is_loading =  false;
                this.show_import = false;
                this.showSuccess('Imported succesfully '+result.length+' items');

			},(error)=>this.showError(error));
		});
	}

	exportFile()
	{
		this.is_loading = true;
		this.rest.servicio_categoria.search({limit:100000}).subscribe((response)=>
		{
			this.rest.array2xlsx(response.data,'usuario.xlsx',["id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion"])
			this.is_loading = false;
		},(error)=>this.showError(error));
	}
}

