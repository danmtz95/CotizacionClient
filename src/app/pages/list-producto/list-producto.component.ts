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


import {Producto,Producto_Detalle} from '../../models/RestModels';
import {ProductoInfo,ProductoDetalleInfo, ProductoMaterialInfo} from '../../models/models';


@Component({
	selector: 'app-list-producto',
	templateUrl: './list-producto.component.html',
	styleUrls: ['./list-producto.component.css']
})

export class ListProductoComponent extends BaseComponent implements OnInit {
	file:File = null;
	show_import:boolean = false;
	show_copiar_producto = false;
	producto_list:ProductoInfo[] = [];
	nuevo_nombre:string = null;
	nuevo_codigo:string = null;
	producto_search:SearchObject<Producto> = { };
	search_extra:StringDictionary<string> = { };
	productoSeleccionado:ProductoInfo = null;

	ngOnInit()
	{

		this.path = '/list-producto';
		this.route.queryParams.subscribe( params =>
		{
			this.setTitle('Productos');
			this.producto_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
				start: {}
			};

			this.producto_search.limit = this.pageSize;

			let keys = ['eq','le','lt','ge','gt','csv','lk'];
			let fields = [ "id","nombre","tipo_manga","codigo", "estatus", "ramos_por_caja" ]

			keys.forEach((k)=>
			{
				fields.forEach((f)=>
				{
					let field = k+"."+f;

					if( params[field ] )
					{
						this.producto_search[ k ][ f ] = params[field] === 'null' ? null : params[ field ];
					}
					else
					{
						this.producto_search[ k ][ f ] = null;
					}
				});
			});

			if( this.producto_search.eq.estatus == null )
			{
				this.producto_search.eq.estatus = 'ACTIVO';
			}

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

			console.log('Search', this.producto_search);

			this.is_loading = true;
			this.producto_search.page =	'page' in params ? parseInt( params.page ) : 0;
			this.currentPage = this.producto_search.page;



				this.is_loading = true;
				this.rest.producto_info.search(this.producto_search, this.search_extra)
				.subscribe((response)=>
				{
					this.setPages( this.producto_search.page, response.total );
					this.producto_list = response.data;
					console.log('productos',this.producto_list);
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

		this.rest.xlsx2json( this.file,["id","codigo","nombre","tipo_manga","ramos_por_caja","cajas_por_tarima","ramos_por_hora","estatus","estatus_detalle"]).then((json)=>
		{
			let productos:ProductoInfo[] = [];
			let lastProducto:ProductoInfo = null;

			json.forEach((productRow)=>{

				console.log('ProductRow',productRow );
				let detalles:Producto_Detalle = {
					estatus				: productRow.estatus_detalle
				};


				if( productRow.id == "" || productRow.id == null )
				{
					lastProducto.detalles.push({
						producto_detalle: detalles
					});
				}
				else if( productRow.id == "nuevo" )
				{
					lastProducto = {
						producto: {
							id			: productRow.id == "nuevo" ? null : parseInt( productRow.id, 10 ),
							estatus		: productRow.estatus,
							nombre		: productRow.nombre,
							tipo_manga	: productRow.tipo_manga,
							codigo		: productRow.codigo,
							ramos_por_caja	: productRow.ramos_por_caja,
							cajas_por_tarima: productRow.cajas_por_tarima,
							ramos_por_hora: productRow.ramos_por_hora,
						},
						detalles: [{ producto_detalle: detalles }]
					};

					productos.push( lastProducto );
				}
				else
				{
					lastProducto = {
						producto: {
							id			: productRow.id == "nuevo" ? null : parseInt( productRow.id, 10 ),
							estatus		: productRow.estatus,
							nombre		: productRow.nombre,
							tipo_manga	: productRow.tipo_manga,
							codigo		: productRow.codigo,
							ramos_por_caja	: productRow.ramos_por_caja,
							cajas_por_tarima: productRow.cajas_por_tarima,
							ramos_por_hora: productRow.ramos_por_hora,
						},
						detalles: [{ producto_detalle: detalles }]
					};

					productos.push( lastProducto );
				}
			});

			console.log('Producto import', productos );

			this.rest.producto_info.batchUpdate(productos).subscribe((result)=>
			{
				this.is_loading =  false;
                this.show_import = false;
                this.showSuccess('Imported succesfully '+result.length+' items');

			},(error)=>this.showError(error));
		});
	}

	exportFile()
	{
		this.is_loading = true;
		this.rest.producto_info.search({limit:100000,eq:{estatus:'ACTIVO'}}).subscribe((response)=>
		{
			let first_row = ["id","codigo","nombre","tipo_manga","ramos_por_caja","cajas_por_tarima","ramos_por_hora","estatus","estatus_detalle"];
			let result = [];
			response.data.forEach((producto_info)=>
			{
				let basicInfo = {
					id					: producto_info.producto.id,
					codigo				: producto_info.producto.codigo,
					nombre				: producto_info.producto.nombre,
					tipo_manga			: producto_info.producto.tipo_manga,
					ramos_por_caja		: producto_info.producto.ramos_por_caja,
					cajas_por_tarima	: producto_info.producto.cajas_por_tarima,
					ramos_por_hora		: producto_info.producto.ramos_por_hora,
					estatus				: producto_info.producto.estatus,
					estatus_detalle		: null
				};

				producto_info.detalles.forEach(i=>
				{
					basicInfo.estatus_detalle		= i.producto_detalle.estatus;
					console.log('basic info push', basicInfo );
					result.push(  basicInfo  );
					basicInfo = {
						id: null,codigo:null,nombre:null, tipo_manga:null, ramos_por_caja: null,cajas_por_tarima: null, estatus: null, estatus_detalle: null,ramos_por_hora: null
					};
				});
			});

			this.rest.array2xlsx(result,'producto.xlsx',first_row);
			console.log( result );
			this.is_loading = false;
		},(error)=>this.showError(error));
	}

	mostrarModalDeCopiar(productoInfo:ProductoInfo )
	{
		this.productoSeleccionado = productoInfo;
		this.show_copiar_producto = true;
	}
	copiar(event:any)
	{
		let productoInfo = this.productoSeleccionado;

		let producto:Producto = {};

		for(let i in productoInfo.producto )
		{
			if( i in { 'id':1, 'nombre':1} )
				continue;

			producto[i]  = productoInfo.producto[i];
		}

		producto.nombre = this.nuevo_nombre;
		producto.codigo = this.nuevo_codigo;

		let producto_info_nuevo:ProductoInfo ={
			producto,
			detalles: [],
			materiales: []
		};

		productoInfo.detalles.forEach((pdi)=>
		{
			let productoDetalleInfo:ProductoDetalleInfo = {
				producto_detalle: {}
			};

			for(let attribute in pdi.producto_detalle )
			{
				if( attribute == 'id' )
					continue;

				productoDetalleInfo.producto_detalle[attribute] =  pdi.producto_detalle[attribute];
			}
			producto_info_nuevo.detalles.push( productoDetalleInfo );
		});

		productoInfo.materiales.forEach((mi)=>
		{
			let productoMaterialInfo:ProductoMaterialInfo = {
				producto_material: {}
			};

			for(let attribute in mi.producto_material )
			{
				if( attribute == 'id' )
					continue;
				productoMaterialInfo.producto_material[attribute] =  mi.producto_material[attribute];
			}
			producto_info_nuevo.materiales.push( productoMaterialInfo );
		});


		this.rest.producto_info.create( producto_info_nuevo ).subscribe(()=>
		{
			this.showSuccess('Producto copiado exitosamente');
			this.nuevo_nombre = null;
			this.nuevo_codigo = null;
			event.target.reset();
			this.show_copiar_producto = false;
		},(error)=>this.showError(error));
	}
}
