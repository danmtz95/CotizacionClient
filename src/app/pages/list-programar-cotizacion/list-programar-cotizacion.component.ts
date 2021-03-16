import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SearchObject } from '../../services/Rest';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NumberDictionary, StringDictionary } from '../../models/models';

import { Cotizacion_Programada, Proveedor, Cliente } from '../../models/RestModels';
import { Organizacion } from '../../models/RestModels';
import { Imagen } from '../../models/RestModels';
import { Cotizacion_Info } from 'src/app/models/Respuestas';

@Component({
	selector: 'app-list-programar-cotizacion',
	templateUrl: './list-programar-cotizacion.component.html',
	styleUrls: ['./list-programar-cotizacion.component.css']
})
export class ListProgramarCotizacionComponent extends BaseComponent implements OnInit {


	TEMPLATE_HEADERS_SIZE = 10;
	file: File = null;
	show_import: boolean = false;
	show_finalizar: boolean = false;
	show_cancelar: boolean = false;
	temp_cotizacion: Cotizacion_Programada;
	cotizacion_programada_search: SearchObject<Cotizacion_Programada> = {};
	search_extra: StringDictionary<string> = {};
	cotizacion_programada_list: Cotizacion_Programada[] = [];
	cliente_list: Cliente[] = [];
	cliente_diccionario: NumberDictionary<Cliente> = {};

	organizacion_list: Organizacion[] = [];
	imagen_list: Imagen[] = [];

	ngOnInit() {
		this.path = '/list-cotizacion-programada';
		this.route.queryParams.subscribe(params => {
			this.cotizacion_programada_search = {
				eq: {},
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
				start: {}
			};


			this.cotizacion_programada_search.limit = this.pageSize;

			this.titleService.setTitle('Cotizaciones-Programadas');

			let keys = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
			let fields = ["id", "id_organizacion", "id_sucursal", "id_usuario", "id_cliente", "nota", "fecha_limite", "tiempo_creacion", "tiempo_actualizacion"]

			keys.forEach((k) => {
				fields.forEach((f) => {
					let field = k + "." + f;

					if (params[field]) {
						this.cotizacion_programada_search[k][f] = params[field] === 'null' ? null : params[field];
					}
					else {
						this.cotizacion_programada_search[k][f] = null;
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

			console.log('Search', this.cotizacion_programada_search);

			this.is_loading = true;
			this.cotizacion_programada_search.page = 'page' in params ? parseInt(params.page) : 0;
			this.currentPage = this.cotizacion_programada_search.page;


			this.is_loading = true;
			forkJoin({
				cotizacion_programada: this.rest.cotizacion_programada.search(this.cotizacion_programada_search),
				cliente: this.rest.cliente.search({})
				// imagen : this.rest.imagen.search({})
			})
				.subscribe((responses) => {
					this.cotizacion_programada_list = responses.cotizacion_programada.data;
					responses.cliente.data.forEach((cliente) => {
						this.cliente_diccionario[cliente.id] = cliente;
					});
					this.setPages(this.cotizacion_programada_search.page, responses.cotizacion_programada.total);
					// this.imagen_list = responses.imagen.data;
					this.is_loading = false;
				}, (error) => this.showError(error));

		});
	}

	finalizarCotizacionProgramada() {
		this.is_loading = true;
		this.temp_cotizacion.estado = 'REALIZADO';
		this.rest.cotizacion_programada.update(this.temp_cotizacion).subscribe((cotizacion_programada) => {
			this.is_loading = false;
			this.temp_cotizacion = cotizacion_programada;
			this.show_finalizar = false;

			// this.router.navigate(['/list-programar-cotizacion']);
		}, (error) => this.showError(error));


	}

	cancelarCotizacionProgramada() {
		this.is_loading = true;
		this.temp_cotizacion.estado = 'CANCELADO';
		this.rest.cotizacion_programada.update(this.temp_cotizacion).subscribe((cotizacion_programada) => {
			this.is_loading = false;
			this.temp_cotizacion = cotizacion_programada;
			this.show_cancelar  = false;
			// this.router.navigate(['/list-programar-cotizacion']);
		}, (error) => this.showError(error));

	}


	onFileChanged(event) {
		if (event.target.files.length) {
			this.file = event.target.files[0];
		}
	}

	uploadFile() {
		this.is_loading = true;
		this.rest.xlsx2json(this.file, ["id", "cotizacion_programada", "nombre", "id_centro_medico", "id_organizacion", "id_imagen", "tipo", "id_tipo_precio", "id_device_notification", "contrasena", "telefono", "correo_electronico", "factura_rfc", "factura_razon_social", "factura_codigo_postal", "factura_correo_electronico", "id_aseguranza", "numero_aseguranza", "tiempo_creacion", "tiempo_actualizacion"]).then((json) => {
			//Filter json then upload
			this.rest.cotizacion_programada.batchUpdate(json).subscribe((result) => {
				if (this.cotizacion_programada_list.length == 0) {
					this.setPages(0, result.length);
					this.cotizacion_programada_list = result.slice(0, this.pageSize);
				}
				this.is_loading = false;
				this.show_import = false;
				this.showSuccess('Imported succesfully ' + result.length + ' items');

			}, (error) => this.showError(error));
		});
	}

	exportFile() {
		this.is_loading = true;
		this.rest.cotizacion_programada.search({ limit: 100000 }).subscribe((response) => {
			this.rest.array2xlsx(response.data, 'cotizacion_programada.xlsx', ["id", "usuario", "nombre", "id_centro_medico", "id_organizacion", "id_imagen", "tipo", "id_tipo_precio", "id_device_notification", "contrasena", "telefono", "correo_electronico", "factura_rfc", "factura_razon_social", "factura_codigo_postal", "factura_correo_electronico", "id_aseguranza", "numero_aseguranza", "tiempo_creacion", "tiempo_actualizacion"])
			this.is_loading = false;
		}, (error) => this.showError(error));
	}

}
