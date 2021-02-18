import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { Proveedor, Servicio, Servicio_Categoria, Unidad_De_Medida } from '../../models/RestModels';
import { Servicio_Info } from '../../models/Respuestas';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Title } from '@angular/platform-browser';
import { NumberDictionary } from 'src/app/models/models';

@Component({
	selector: 'app-save-servicio',
	templateUrl: './save-servicio.component.html',
	styleUrls: ['./save-servicio.component.css']
})
export class SaveServicioComponent extends BaseComponent implements OnInit {

	servicio_info: Servicio_Info = {
		servicio: {
			'id': null,
			'id_proveedor': null,
			'id_unidad_de_medida': null,
			'id_categoria': null,
			'nombre': '',
			'codigo': '',
			'tipo': null,
		},
		servicio_detalles: []
	};

	search_item: string = '';
	search_servicios: Servicio[] = [];
	precios = {};
	session = null;
	id_servicio: number = null;

	proveedor_list: Proveedor[] = [];
	proveedor_diccionario: NumberDictionary<Proveedor> = {};
	categoria_list: Servicio_Categoria[] = [];
	categoria_diccionario: NumberDictionary<Servicio_Categoria> = {};
	unidad_de_medida_list: Unidad_De_Medida[] = [];
	unidad_de_medida_diccionario: NumberDictionary<Unidad_De_Medida> = {};
	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id_servicio = parseInt(params.get('id'));
			this.session = this.rest.getUsuarioSesion();
			this.is_loading = true;
			if (id_servicio) {
				forkJoin({
					servicio_info: this.rest.servicio_info.get(id_servicio),
					proveedor: this.rest.proveedor.search({}),
					categoria: this.rest.servicio_categoria.search({}),
					unidad_de_medida: this.rest.unidad_de_medida.search({}),
				})
					.subscribe((responses) => {
						this.servicio_info = responses.servicio_info;
						this.proveedor_list = responses.proveedor.data;
						responses.proveedor.data.forEach((proveedor) => {
							this.proveedor_diccionario[proveedor.id] = proveedor;
						});
						this.categoria_list = responses.categoria.data;
						responses.categoria.data.forEach((categoria) => {
							this.categoria_diccionario[categoria.id] = categoria;
						});
						this.unidad_de_medida_list = responses.unidad_de_medida.data;
						responses.unidad_de_medida.data.forEach((unidad_de_medida) => {
							this.unidad_de_medida_diccionario[unidad_de_medida.id] = unidad_de_medida;
						});

						this.is_loading = false;
					}, (error) => this.showError(error));
			}
			else {
				this.servicio_info.servicio.id_organizacion = this.session.id_organizacion;
				this.servicio_info.servicio.id_sucursal = this.session.id;
				//this.rest.precio_servicio.getAll({ id_servicio: this.id })
				forkJoin({
					proveedor: this.rest.proveedor.search({}),
					categoria: this.rest.servicio_categoria.search({}),
					unidad_de_medida: this.rest.unidad_de_medida.search({}),

				})
					.subscribe((responses) => {
						this.proveedor_list = responses.proveedor.data;
						responses.proveedor.data.forEach((proveedor) => {
							this.proveedor_diccionario[proveedor.id] = proveedor;
						});
						this.categoria_list = responses.categoria.data;
						responses.categoria.data.forEach((categoria) => {
							this.categoria_diccionario[categoria.id] = categoria;
						});
						this.unidad_de_medida_list = responses.unidad_de_medida.data;
						responses.unidad_de_medida.data.forEach((unidad_de_medida) => {
							this.unidad_de_medida_diccionario[unidad_de_medida.id] = unidad_de_medida;
						});

						this.is_loading = false;
					}, (error) => this.showError(error));
				this.is_loading = false;

			}
		});
	}

	agregarServicio(servicio: Servicio) {

		let index = this.servicio_info.servicio_detalles.findIndex(i => i.servicio_recurso.id == servicio.id);

		if (index > -1) {
			this.servicio_info.servicio_detalles[index].servicio_recurso.cantidad++;
		}
		else {
			this.servicio_info.servicio_detalles.push({
				servicio_secundario: servicio
				, servicio_recurso: { id_servicio_secundario: servicio.id, cantidad: 1 }
			})
		}
		// this.search = '';
		this.search_servicios = [];

		this.updateCantidades();
		console.log('Agregando Servicio', servicio);
	}


	// initValores(valores)
	// {
	// 	console.log( valores );
	// 	this.tipo_precios = valores[0].datos;
	// 	this.centros_medicos = valores[1].datos;
	// 	this.unidades_de_medida = valores[ 2 ].datos;

	// 	if( valores.length ==	5 )
	// 	{
	// 		this.precio_servicios = valores[3].datos;
	// 		this.servicio_recurso = valores[4];

	// 	}
	// 	else
	// 	{
	// 		this.servicio_recurso = {
	// 			servicio:{
	// 				'id': null,
	// 				'nombre': '',
	// 				'codigo': '',
	// 				'prestado_por': 'CENTRO_MEDICO',
	// 				'tipo':null,
	// 				'id_unidad_medida':null
	// 			},
	// 			recursos : []
	// 		}

	// 		this.precio_servicios = [];
	// 	}

	// 	this.updateCantidades();

	// 	this.centros_medicos.forEach( i=> this.precios[i.id] = {});

	// 	this.centros_medicos.forEach((centro_medico)=>
	// 	{
	// 		this.tipo_precios.forEach((tipo_precio)=>
	// 		{
	// 			let some = this.precio_servicios.find(p => p.id_centro_medico == centro_medico.id && p.id_tipo_precio == tipo_precio.id );
	// 			if( !some )
	// 			{
	// 				this.precios[ centro_medico.id ][ tipo_precio.id ] = {
	// 					id_centro_medico	: centro_medico.id
	// 					,id_tipo_precio		: tipo_precio.id
	// 					,id_servicio		: this.servicio_recurso.servicio.id

	// 				};
	// 			}
	// 			else
	// 			{
	// 				console.log('some',some);
	// 				this.precios[ centro_medico.id ][ tipo_precio.id ] = some;
	// 			}
	// 		});
	// 	});
	// 	this.is_loading = false;
	// }

	save() {
		this.is_loading = true;

		if (this.servicio_info.servicio.id) {
			this.rest.servicio_info.update(this.servicio_info).subscribe((response) => {
				this.servicio_info = response;
				// this.updatePrecios(); this.is_loading = false;
				this.router.navigate(['/list-servicio']);
			}
				, (error) => {
					this.is_loading = false;

					this.showError(error);
				});
		}
		else {
			this.rest.servicio_info.create(this.servicio_info).subscribe((response) => {
				this.servicio_info = response;
				// this.updatePrecios(); this.is_loading = false;
				this.router.navigate(['/list-servicio']);
			},
				(error) => {
					this.showError(error); this.is_loading = false;

				})

		}
	}

	// updatePrecios()
	// {

	// 	let nprecios:Precio_Servicio[] = [];

	// 	console.log("precios",this.precios );
	// 	for(let i in this.precios )
	// 	{
	// 		for(let j in this.precios[i])
	// 		{
	// 			this.precios[i][j].id_servicio = this.servicio_recurso.servicio.id;
	// 			if( this.precios[i][j].precio )
	// 			{
	// 				nprecios.push( this.precios[i][j] );
	// 			}
	// 		}
	// 	}
	// 	this.is_loading = true;

	// 	this.rest.precio_servicio.batchUpdate( nprecios ).subscribe((result)=>
	// 	{
	// 		//this.success_message = 'Hell Yeah';
	// 		this.router.navigate(['/servicios']); this.is_loading = false;

	// 	}
	// 	,(error)=>
	// 	{
	// 		this.is_loading = false;
	// 		this.showError( error );
	// 	});
	// }

	changeSearchServicio(evt) {
		this.rest.servicio.search({
			lk: { nombre: evt.target.value }
			, eq: { id_organizacion: this.session.id_organizacion, tipo: 'PRODUCTO_FISICO' }
		}).subscribe((response) => {
			this.search_servicios = response.data;
		});
	}

	getPrice(price1: number, price2: number) {
		if (price1 > price2) {
			let total: number = price1 - price2;
			return total / price2;
		}
		else {
			return 1 - price1 / price2;
		}
	}

	aumentarCantidadServicio(servicio) {

		let index = this.servicio_info.servicio_detalles.findIndex(i => i.servicio_secundario.id == servicio.id);

		if (index > -1) {
			this.servicio_info.servicio_detalles[index].servicio_recurso.cantidad;
		}

		// verificar si se quiere un total aproximado del precio del producto
		// this.calcularTotalCotizacion();
		console.log('Agregando Servicio', servicio);
	}

	eliminarServicio(sd) {
		let index = this.servicio_info.servicio_detalles.findIndex(i => i.servicio_secundario.id == sd.servicio.id);
		if (index > -1)
			this.servicio_info.servicio_detalles.splice(index, 1);
		else
			console.log("Se elimino el articulo no. :", index);

		// verificar si se quiere un total aproximado del precio del producto
		// this.calcularTotalCotizacion();
	}

	updateCantidades() {
		this.servicio_info.servicio_detalles = this.servicio_info.servicio_detalles.filter(i => i.servicio_recurso.cantidad > 0);
		// this.servicio_recurso.servicio.precio_referencia = this.servicio_recurso.recursos.reduce((p,c)=>p+c.servicio.precio_referencia*c.recurso.cantidad,0);
	}

}
