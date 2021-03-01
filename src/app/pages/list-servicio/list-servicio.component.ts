import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Servicio, } from '../../models/RestModels';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from '../../models/Respuestas';
import { withLatestFrom } from 'rxjs/operators';
import { StringDictionary } from 'src/app/models/models';

@Component({
	selector: 'app-list-servicio',
	templateUrl: './list-servicio.component.html',
	styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent extends BaseComponent implements OnInit {


	TEMPLATE_HEADERS_SIZE = 10;
	file: File = null;
	show_import: boolean = false;
	session;
	servicio_list: Servicio[] = [];
	servicio_list_tmp: Servicio[] = [];
	is_loading: boolean = false;
	servicio_search: SearchObject<Servicio> ={};
	search_extra: StringDictionary<string> = {};
	// busqueda
	filter_servicio_id: string = '';
	filter_servicio_nombre: string = '';
	filter_servicio_codigo: string = '';
	filter_servicio_costo: string = '';

	ngOnInit() {
		this.session = this.rest.getUsuarioSesion();
		this.path = '/list-servicio';
		this.subs.sink = this.route.paramMap.subscribe(params=>{
			console.log('paramMap');
		});
		this.subs.sink = this.route.queryParams.subscribe(queryParams=>{
			console.log('queryParams');

		// console.log('imprimiendo organizacion',this.centro_medico);

				console.log('que pedo putos');
				let fields = ["id", "nombre","id_organizacion","id_sucursal","codigo", "fecha_creacion", "fecha_actualizacion"];
				this.servicio_search = this.getSearchField(queryParams, fields);
				let extra_keys: Array<string> = []; //['search_param1','project_id','some_id'];
				this.search_extra = this.getSearchExtra(queryParams, extra_keys);
				this.servicio_search.eq.id_organizacion = this.session.id_organizacion;
				this.servicio_search.eq.id_sucursal = this.session.id_sucursal;

				// this.servicio_search = {
				// 	eq: { id_organizacion: this.session.id_organizacion, id_sucursal: this.session.id_sucursal },
				// 	gt: {},
				// 	ge: {},
				// 	le: {},
				// 	lt: {},
				// 	lk: {},
				// 	csv: {},
				// }
				this.titleService.setTitle('Servicios')
				// this.servicio_search.lk.codigo = "lk.codigo" in queryParams ? queryParams["lk.codigo"] : null;
				// this.servicio_search.lk.nombre = "lk.nombre" in queryParams ? queryParams["lk.nombre"] : null;

				// this.servicio_search.limite			= 99999;

				this.servicio_search.page = 'page' in queryParams ? parseInt(queryParams.page) : 0;

				this.servicio_search.limit = this.pageSize;

				this.currentPage = this.servicio_search.page;
				this.is_loading = true;

			 this.subs.sink =this.rest.servicio.search(this.servicio_search ,this.search_extra).subscribe((respuesta) => {
					this.servicio_list = respuesta.data;
					this.servicio_list_tmp = respuesta.data;
					console.table(this.servicio_list);
					this.setPages(this.servicio_search.page, respuesta.total);
					this.is_loading = false;
				}, error => this.showError(error));
			});
	}

	changeSearch(nombre: string) {

	}

	search() {
		this.is_loading = true;
		this.servicio_search.page = 0;
		this.servicio_search.eq.id_organizacion = this.session.id_organizacion;
		this.servicio_search.eq.id_sucursal = this.session.id_sucursal;
		// this.servicio_search.lk.nom = this.servicio_search.lk.nombre;
		let search = {};
		let array = ['eq', 'le', 'lt', 'ge', 'gt', 'csv', 'lk'];
		for (let i in this.servicio_search) {
			console.log('i', i, array.indexOf(i));
			if (array.indexOf(i) > -1) {
				for (let j in this.servicio_search[i])
					search[i + '.' + j] = this.servicio_search[i][j];
			}
		}
		console.log(search);
		this.router.navigate(['list-servicio'], { queryParams: search });

	}

	onFileChanged(event) {
		if (event.target.files.length) {
			this.file = event.target.files[0];
		}
	}


	buscarFiltrarServicio(evt: any) {

		let orden_detalle_list_tmp: Servicio[] = []
		let orden_filter: Servicio[] = [];
		// console.log('filtercustomername', this.filter_id);
		orden_filter = this.filter();
		console.log('orden.filter', orden_filter);
		this.servicio_list_tmp = orden_filter;
		// for (let i in this.checked_items) {
		// 	this.checked_items[i] = false;
		// }
		//this.checked_items = {};
		// orden_detalle_list_tmp= orden_filter;
		// this.orden_detalle_tmp = orden_detalle_list_tmp;
	}

	filter() {
		return this.servicio_list.filter(servicio => {
			if (this.filter_servicio_id && servicio.id) {
				if (!(servicio.id.toString().includes(this.filter_servicio_id.toUpperCase()))) {
					return false;
				}
			}
			if (this.filter_servicio_nombre && servicio.nombre) {
				if (!(servicio.nombre.toUpperCase().includes(this.filter_servicio_nombre.toUpperCase()))) {
					return false;
				}
			}
			if (this.filter_servicio_codigo && servicio.codigo) {
				if (!(servicio.codigo.toUpperCase().includes(this.filter_servicio_codigo.toUpperCase()))) {
					return false;
				}
			}
			if (this.filter_servicio_costo && servicio.costo) {
				if (!(servicio.costo.toString().toUpperCase().includes(this.filter_servicio_costo.toUpperCase()))) {
					return false;
				}
			}
			return true;
		}
		);
	}

	uploadFile() {
		this.is_loading = true;
		this.rest.xlsx2json(this.file, ["codigo", "marca", "nombre", "precio_venta", "precio_especial", "costo", "codigo_sat", "url_imagen", "id_organizacion", "id_sucursal", "id_proveedor", "id_unidad_de_medida", "id_categoria", "iva", "tipo"]).then((json) => {
			//Filter json then upload
			this.rest.servicio.batchUpdate(json).subscribe((result) => {
				if (this.servicio_list.length == 0) {
					this.setPages(0, result.length);
					this.servicio_list = result.slice(0, this.pageSize);
				}
				this.is_loading = false;
				this.show_import = false;
				this.showSuccess('Imported succesfully ' + result.length + ' items');

			}, (error) => this.showError(error));
		});
	}

	exportFile() {
		this.is_loading = true;
		this.rest.servicio.search({ limit: 100000 }).subscribe((response) => {
			this.rest.array2xlsx(response.data, 'servicio_list.xlsx', ["id", "codigo", "marca", "nombre", "precio_venta", "precio_especial", "costo", "codigo_sat", "url_imagen", "id_organizacion", "id_sucursal", "id_proveedor", "id_unidad_de_medida", "id_categoria", "iva", "tipo"])
			this.is_loading = false;
		}, (error) => this.showError(error));
	}


}
