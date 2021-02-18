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
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-save-cotizacion',
  templateUrl: './save-cotizacion.component.html',
  styleUrls: ['./save-cotizacion.component.css']
})

export class SaveCotizacionComponent extends BaseComponent implements OnInit {
	control = new FormControl();
	cotizacion_info:Cotizacion_Info= {
		cotizacion:{
			'id': null,
			'id_cliente':null,
			'id_usuario':null,
			'flete':null,
			'costo':null,
			'iva':null,
			'costo_total':null,
			'tipo_de_pago':null,
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
	//Variables generales subtotal,iva8,iva16,total
	total_iva_8 =0;
	total_iva_16 =0;
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
			console.log('session',this.session);
				this.is_loading = true;
				if( id_cotizacion )
				{
					forkJoin({
						cotizacion_info : this.rest.cotizacion_info.get( id_cotizacion ),
						usuario : this.rest.usuario.search({}),
						cliente : this.rest.cliente.search({})
					})
					.subscribe((responses)=>
					{
						this.cotizacion_info= responses.cotizacion_info;
						this.cliente_list = responses.cliente.data;
						responses.usuario.data.forEach((usuario)=>{
							this.usuario_diccionario[ usuario.id ] = usuario;
						});

						responses.cliente.data.forEach((cliente)=>{
							this.cliente_diccionario[ cliente.id ] = cliente;
						});
						this.calcularTotalCotizacion();
						this.is_loading = false;
					},(error)=>this.showError(error));
				}else{
					this.cotizacion_info.cotizacion.id_organizacion = this.session.id_organizacion;
					this.cotizacion_info.cotizacion.id_sucursal = this.session.id_sucursal;
					this.cotizacion_info.cotizacion.id_usuario = this.session.id;
					forkJoin({
						usuario : this.rest.usuario.search({}),
						cliente : this.rest.cliente.search({})
					})
					.subscribe((responses)=>
					{
						this.cliente_list = responses.cliente.data;

						responses.cliente.data.forEach((cliente)=>{
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
			,eq:{ id_organizacion: this.session.id_organizacion, }
		}).subscribe((response)=>
		{
			this.search_servicios = response.data;
		});
	}

	agregarServicio(servicio)
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
				,cotizacion_detalle: { id_servicio: servicio.id, cantidad: 1, }
			})
		}
		// this.search = '';
		this.search_servicios = [];

		this.calcularTotalCotizacion();
		console.log('Agregando Servicio', servicio);
	}

	calcularTotalCotizacion() {
		let costo = 0;
		let costo_total = 0;
		let flete = this.cotizacion_info.cotizacion.flete ? this.cotizacion_info.cotizacion.flete : 0;
		let costo_iva = 0;
		let costo_iva_total = 0;
		//para separar los totales de iva de los productos
		let total_iva_8 = 0;
		let total_iva_16 = 0;

		for (let i of this.cotizacion_info.cotizacion_detalles) {
			if(i.cotizacion_detalle.precio == null){
				i.cotizacion_detalle.precio = i.servicio.costo;
				i.cotizacion_detalle.iva = i.servicio.iva;
				i.cotizacion_detalle.costo_iva = (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad)*(0.01*i.cotizacion_detalle.iva);
			}
			//cantidad correspondiente al iva del producto
			i.cotizacion_detalle.costo_iva = (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad)*(0.01*i.cotizacion_detalle.iva);
			//costo total correspondiente al producto
			i.cotizacion_detalle.costo_total = i.cotizacion_detalle.precio + i.cotizacion_detalle.costo_iva;
			// suma de los totales de iva de los productos 8 y 16
			if(i.cotizacion_detalle.iva == 8){
				total_iva_8 += i.cotizacion_detalle.costo_iva;
			}else if(i.cotizacion_detalle.iva == 16){
				total_iva_16 += i.cotizacion_detalle.costo_iva;
			}
			costo_iva_total += (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad)*(0.01*i.cotizacion_detalle.iva);

			//subtota/

			costo += i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad;
		}
		costo_total= (costo + costo_iva_total + flete);
		this.total_iva_8 = total_iva_8;
		this.total_iva_16 = total_iva_16;
		this.cotizacion_info.cotizacion.costo_iva = costo_iva_total;
		this.cotizacion_info.cotizacion.costo = costo;

		// costo_iva = costo*(0.1*iva);
		this.cotizacion_info.cotizacion.costo_total = costo_total;
		console.log('costototal',this.cotizacion_info.cotizacion.costo_total);

	}

	aumentarCantidad(servicio)
	{

		let index = this.cotizacion_info.cotizacion_detalles.findIndex(i=> i.servicio.id == servicio.id );

		if( index > -1  )
		{
			this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.cantidad ;
		}


		this.calcularTotalCotizacion();
		console.log('Agregando Servicio', servicio);
	}
	aumentarPrecio(servicio)
	{

		let index = this.cotizacion_info.cotizacion_detalles.findIndex(i=> i.servicio.id == servicio.id );

		if( index > -1  )
		{
			this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.precio ;
		}


		this.calcularTotalCotizacion();
		console.log('Agregando Servicio', servicio);
	}

	aumentarIva(servicio)
	{

		let index = this.cotizacion_info.cotizacion_detalles.findIndex(i=> i.servicio.id == servicio.id );

		if( index > -1  )
		{
			this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.iva ;
		}


		this.calcularTotalCotizacion();
		console.log('Agregando Servicio', servicio);
	}

	eliminar(sd) {
		let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == sd.servicio.id);
		if (index > -1)
			this.cotizacion_info.cotizacion_detalles.splice(index, 1);
		else
			console.log("Se elimino el articulo no. :",index);

		this.calcularTotalCotizacion();
	}


	save()
	{
		this.is_loading = true;

		if( this.cotizacion_info.cotizacion.id	)
		{
			console.log('coti',this.cotizacion_info);
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
