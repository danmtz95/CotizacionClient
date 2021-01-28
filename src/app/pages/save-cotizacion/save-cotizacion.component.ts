import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import {Cliente, Cotizacion, Proveedor, Servicio, Usuario} from '../../models/RestModels';
import {Organizacion} from '../../models/RestModels';
import {Imagen} from '../../models/RestModels';
import { NumberDictionary } from 'src/app/models/models';
import { Cotizacion_Info } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-save-cotizacion',
  templateUrl: './save-cotizacion.component.html',
  styleUrls: ['./save-cotizacion.component.css']
})

export class SaveCotizacionComponent extends BaseComponent implements OnInit {

	cotizacion_info:Cotizacion_Info= {
		cotizacion:{
			'id': null,
			'id_cliente':null,
			'flete':null,
			'costo':null,
			'iva':null,
			'costo_total':null,
			'fecha_de_entrega':null,
			'nota':'',
		},
		cotizacion_detalles : []
	};
	organizacion_list:Organizacion[] = [];
	imagen_list:Imagen[] = [];
	// diccionarios
	usuario_diccionario:NumberDictionary<Usuario> = {};
	cliente_diccionario:NumberDictionary<Cliente> = {};
	session
	cliente_list:Cliente[]=[];
	// busqueda de servicios
	search_item:string = '';
	search_servicios:Servicio[] = [];
	ngOnInit()
	{
		this.route.paramMap.subscribe( params =>
		{
			//this.company = this.rest.getCompanyFromSession();

			let id_cotizacion = parseInt( params.get('id') );
			this.session = this.rest. getUsuarioSesion();
				this.is_loading = true;
				if( id_cotizacion )
				{
					forkJoin({
						cotizacion_info : this.rest.cotizacion_info.get( id_cotizacion ),
						usuario : this.rest.usuario.search({})
					})
					.subscribe((responses)=>
					{
						this.cotizacion_info= responses.cotizacion_info;
						responses.usuario.data.forEach((usuario)=>{
							this.usuario_diccionario[ usuario.id ] = usuario;
						});

						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.cotizacion_info.cotizacion.id_organizacion = this.session.id_organizacion;
					this.cotizacion_info.cotizacion.id_sucursal = this.session.id_sucursal;
					this.cotizacion_info.cotizacion.id_usuario = this.session.id_usuario;
					forkJoin({
						usuario : this.rest.usuario.search({}),
						cliente : this.rest.cliente.search({})
					})
					.subscribe((responses)=>
					{
						this.cliente_list = responses.cliente.data;

						responses.usuario.data.forEach((cliente)=>{
							this.cliente_diccionario[ cliente.id ] = cliente;
						});

						responses.usuario.data.forEach((usuario)=>{
							this.usuario_diccionario[ usuario.id ] = usuario;
						});

						this.is_loading = false;
					},(error)=>this.showError(error));
					this.is_loading = false;
				}

		});
	}

	changeSearchServicio(evt)
	{
		this.rest.servicio.search({
			lk:{ nombre: evt.target.value }
			,eq:{ id_organizacion: this.session.id_organizacion, tipo: 'PRODUCTO_FISICO' }
		}).subscribe((response)=>
		{
			this.search_servicios = response.data;
		});
	}

	agregarServicio(servicio:Servicio)
	{

		let index = this.cotizacion_info.cotizacion_detalles.findIndex(i=> i.servicio.id == servicio.id );

		if( index > -1  )
		{
			this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.cantidad++;
		}
		else
		{
			this.cotizacion_info.cotizacion_detalles.push({
				servicio: servicio
				,cotizacion_detalle: { id_servicio: servicio.id, cantidad: 1 }
			})
		}
		// this.search = '';
		this.search_servicios = [];

		// this.updateCantidades();
		console.log('Agregando Servicio', servicio);
	}


	save()
	{
		this.is_loading = true;

		if( this.cotizacion_info.cotizacion.id	)
		{
			this.rest.cotizacion_info.update( this.cotizacion_info ).subscribe((cotizacion_info)=>{
				this.is_loading = false;
				this.router.navigate(['/list-cotizacion']);
			},(error)=>this.showError(error));
		}
		else
		{
			this.rest.cotizacion_info.create( this.cotizacion_info ).subscribe((cotizacion_info)=>{
				this.is_loading = false;
				this.router.navigate(['/list-cotizacion']);
			},(error)=>this.showError(error));
		}
	}

}
