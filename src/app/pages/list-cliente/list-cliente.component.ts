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


import {Cliente, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';


@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent extends BaseComponent implements OnInit {

	TEMPLATE_HEADERS_SIZE = 10;
	file:File = null;
	show_import:boolean = false;
	cliente_search:SearchObject<Cliente> = { };
	search_extra:StringDictionary<string> = { };
	cliente_list:Cliente[] = [];


	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];

	ngOnInit()
	{
		this.path = '/list-cliente';
		this.route.queryParams.subscribe( params =>
		{
			this.cliente_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
				start: {}
			};


			this.cliente_search.limit = this.pageSize;

			this.titleService.setTitle('cliente');

			let keys = ['eq','le','lt','ge','gt','csv','lk'];
			let fields = [ "id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion" ]

			keys.forEach((k)=>
			{
				fields.forEach((f)=>
				{
					let field = k+"."+f;

					if( params[field ] )
					{
						this.cliente_search[ k ][ f ] = params[field] === 'null' ? null : params[ field ];
					}
					else
					{
						this.cliente_search[ k ][ f ] = null;
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

			console.log('Search', this.cliente_search);

			this.is_loading = true;
			this.cliente_search.page =	'page' in params ? parseInt( params.page ) : 0;
			this.currentPage = this.cliente_search.page;


			this.is_loading = true;
			forkJoin({
				cliente : this.rest.cliente.search(this.cliente_search),
				// imagen : this.rest.imagen.search({})
			})
			.subscribe((responses)=>
			{
				this.cliente_list = responses.cliente.data;
				this.setPages( this.cliente_search.page, responses.cliente.total );
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
			this.rest.cliente.batchUpdate(json).subscribe((result)=>
			{
				if( this.cliente_list.length == 0 )
				{
					this.setPages( 0, result.length );
					this.cliente_list = result.slice(0,this.pageSize);
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
		this.rest.cliente.search({limit:100000}).subscribe((response)=>
		{
			this.rest.array2xlsx(response.data,'usuario.xlsx',["id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion"])
			this.is_loading = false;
		},(error)=>this.showError(error));
	}
}

