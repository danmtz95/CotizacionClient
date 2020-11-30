import { Injectable } from '@angular/core'; import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Rest, RestResponse } from './Rest';
import { LoginResponse } from '../models/Respuestas';
import { Bitacora, Caja, Equivalencia, Orden_Detalle_Produccion_Cajas, Ramo_Produccion, Requisicion_Flor, Requisicion_Material, Transfer } from '../models/RestModels';
import { Asistencia_Personal } from '../models/RestModels';
import { Orden_Detalle_Personal } from '../models/RestModels';
import { NumberDictionary, StringDictionary } from '../models/models';

import { Cliente } from '../models/RestModels';
import { Color } from '../models/RestModels';
import { Distribuidor } from '../models/RestModels';
import { Envio } from '../models/RestModels';
import { File_Type } from '../models/RestModels';
import { Flor } from '../models/RestModels';
import { Flor_Variedad } from '../models/RestModels';
import { Imagen } from '../models/RestModels';
import { Inventario } from '../models/RestModels';
import { Inventario_Material_Movimiento } from '../models/RestModels';
import { Orden } from '../models/RestModels';
import { Orden_Personal } from '../models/RestModels';
import { Orden_Detalle } from '../models/RestModels';
import { Organizacion } from '../models/RestModels';
import { Pedido } from '../models/RestModels';
import { Proyeccion_De_Asistencia } from '../models/RestModels';
import { Proyeccion_De_Corte } from '../models/RestModels';
import { Ramo, Ramo_Detalle, Reemplazo_Flor } from '../models/RestModels';

import { Sesion } from '../models/RestModels';
import { Sucursal, Personal, Producto, Pronostico_Corte } from '../models/RestModels';
import { Recibo_Inventario } from '../models/RestModels';
import { Tarima } from '../models/RestModels';
import { Usuario } from '../models/RestModels';
import { Inventario_Material } from '../models/RestModels';
import { Material } from '../models/RestModels';
import { Attachment } from '../models/RestModels'
import { OrdenInfo, OrdenDetalleInfo, OrdenInventarioInfo, ProductoEquivalenciaInfo, InventarioInfo, PersonalAsistenciaInfo, RamoInfo, TransferInfo, GraphData } from '../models/models';
import { ProductoInfo } from '../models/models';
import { PedidoInfo, FloresRequeridas } from '../models/models';
import { Distribuidor_Direccion } from '../models/RestModels';
import { Archivo_Cargado, Requisicion } from '../models/RestModels';
import { RequisicionInfo, TarimaInfo, CajaInfo } from '../models/models';
import { EnvioInfo } from '../models/models';
import { ReciboInventarioInfo } from '../models/models';
//import { forkJoin } from 'rxjs';

import { NgxCsvParser } from 'ngx-csv-parser';

export class ErrorMessage {

	message: string;
	type: string;

	constructor(message: string, type: string) {
		this.message = message;
		this.type = type;
	}
}

@Injectable({
	providedIn: 'root'
})

export class RestService {

	public currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
	public keyUpObserver: Observable<KeyboardEvent>;
	public errorBehaviorSubject: BehaviorSubject<ErrorMessage>;
	public errorObservable: Observable<ErrorMessage>;
	public urlBase: string = this.getUrlBase();

	/* Rest variable declarations */
	public ramo_produccion: Rest<Ramo_Produccion, Ramo_Produccion> = this.initRest('ramo_produccion');
	public bitacora: Rest<Bitacora, Bitacora> = this.initRest('bitacora');
	public caja: Rest<Caja, Caja> = this.initRest('caja');
	public caja_info: Rest<Caja, CajaInfo> = this.initRest('cajaInfo');
	public cliente: Rest<Cliente, Cliente> = this.initRest('cliente');
	public color: Rest<Color, Color> = this.initRest('color');
	public distribuidor: Rest<Distribuidor, Distribuidor> = this.initRest('distribuidor');
	public envio: Rest<Envio, EnvioInfo> = this.initRest('envio_info');
	public file_type: Rest<File_Type, File_Type> = this.initRest('file_type');
	public flor: Rest<Flor, Flor> = this.initRest('flor');
	public flor_variedad: Rest<Flor_Variedad, Flor_Variedad> = this.initRest('flor_variedad');
	public inventario: Rest<Inventario, Inventario> = this.initRest('inventario');
	public inventario_material_movimiento: Rest<Inventario_Material_Movimiento, Inventario_Material_Movimiento> = this.initRest('inventario_material_movimiento');
	public inventario_info: Rest<Inventario, InventarioInfo> = this.initRest('inventario_info');
	public inventario_total: Rest<Inventario, Inventario> = this.initRest('inventarioReporte');
	public material: Rest<Material, Material> = this.initRest('material');
	public orden: Rest<Orden, Orden> = this.initRest('orden');
	public orden_personal: Rest<Orden_Personal, Orden_Personal> = this.initRest('orden_personal');
	public organizacion: Rest<Organizacion, Organizacion> = this.initRest('organizacion');
	public pedido: Rest<Pedido, Pedido> = this.initRest('pedido');
	public personal: Rest<Personal, Personal> = this.initRest('personal');
	public producto: Rest<Producto, Producto> = this.initRest('producto');
	public pronostico_corte: Rest<Pronostico_Corte, Pronostico_Corte> = this.initRest('pronostico_corte');
	public proyeccion_de_asistencia: Rest<Proyeccion_De_Asistencia, Proyeccion_De_Asistencia> = this.initRest('proyeccion_de_asistencia');
	public proyeccion_de_corte: Rest<Proyeccion_De_Corte, Proyeccion_De_Corte> = this.initRest('proyeccion_de_corte');

	public ramo_info: Rest<Ramo, RamoInfo> = this.initRest('ramo');
	public ramo_detalle: Rest<Ramo_Detalle, Ramo_Detalle> = this.initRest('ramo_detalle');
	public recibo_inventario_info: Rest<Recibo_Inventario, ReciboInventarioInfo> = this.initRest('recibo_inventario');
	public reemplazo_flor: Rest<Reemplazo_Flor, Reemplazo_Flor> = this.initRest('reemplazo_flor');
	public sesion: Rest<Sesion, Sesion> = this.initRest('sesion');
	public sucursal: Rest<Sucursal, Sucursal> = this.initRest('sucursal');
	public tarima: Rest<Tarima, TarimaInfo> = this.initRest('tarima');
	public usuario: Rest<Usuario, Usuario> = this.initRest('usuario');
	public orden_info: Rest<Orden, OrdenInfo> = this.initRest('ordenInfo');
	public orden_detalle_info: Rest<Orden_Detalle, OrdenDetalleInfo> = this.initRest('ordenDetalleInfo');
	public orden_detalle_personal: Rest<Orden_Detalle_Personal, Orden_Detalle_Personal> = this.initRest('orden_detalle_personal');

	public producto_info: Rest<Producto, ProductoInfo> = this.initRest('productoInfo');
	public producto_equivalencia: Rest<Equivalencia, ProductoEquivalenciaInfo> = this.initRest('equivalenciaInfo');
	public producto_equivalencia2: Rest<Equivalencia, ProductoEquivalenciaInfo> = this.initRest('equivalenciaInfo');
	public equivalencia: Rest<Equivalencia, Equivalencia> = this.initRest('equivalencia');
	public orden_inventario: Rest<Orden, OrdenInventarioInfo> = this.initRest('ordenInventarioInfo');
	public inventario_material: Rest<Inventario_Material, Inventario_Material> = this.initRest('inventario_material');
	public pedidoInfo: Rest<Pedido, PedidoInfo> = this.initRest('pedidoInfo');
	public distribuidor_direccion: Rest<Distribuidor_Direccion, Distribuidor_Direccion> = this.initRest('distribuidor_direccion');
	public archivo_cargado: Rest<Archivo_Cargado, Archivo_Cargado> = this.initRest('archivo_cargado');
	public asistencia_personal: Rest<Asistencia_Personal, Asistencia_Personal> = this.initRest('asistencia_personal');
	public personal_asistencia_info: Rest<Asistencia_Personal, PersonalAsistenciaInfo> = this.initRest('personal_asistencia_info');
	public requisicion_flor: Rest<Requisicion_Flor, Requisicion_Flor> = this.initRest('requisicion_flor');
	public requisicion_material: Rest<Requisicion_Material, Requisicion_Material> = this.initRest('requisicion_material');
	public transfer_info: Rest<Transfer, TransferInfo> = this.initRest('transfer_info');
	public orden_detalle_produccion_cajas: Rest<Orden_Detalle_Produccion_Cajas, Orden_Detalle_Produccion_Cajas> = this.initRest('orden_detalle_produccion_cajas');
	public requisicion_info: Rest<Requisicion, RequisicionInfo> = this.initRest('requisicionInfo');

	constructor(private http: HttpClient, public ngxCsvParser: NgxCsvParser) {
		//Produccion por cambiarx`x
		this.keyUpObserver = fromEvent<KeyboardEvent>(window.document.body, 'keyup');

		this.errorBehaviorSubject = new BehaviorSubject<ErrorMessage>(null);
		this.errorObservable = this.errorBehaviorSubject.asObservable();

		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuario')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	getUrlBase() {

		if (window.location.hostname.indexOf('127.0.') == 0 || window.location.hostname.indexOf('192.168') == 0)
			return window.location.protocol + '//' + window.location.hostname + '/IntegranetCotizacion';

		if (window.location.hostname.indexOf('localhost') == 0)
			return window.location.protocol + '//127.0.0.1/IntegranetCotizacion';

		return "http://54.175.170.17/IntegranetCotizacion/api"
	}

	public initRest<T, U>(path: string) {
		return new Rest<T, U>(`${this.urlBase}/${path}.php`, this.http);
	}

	getSessionHeaders() {
		if (localStorage.getItem('session_token') == null) {
			return new HttpHeaders();
		}

		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('session_token'));
		return headers;
	}

	getUsuarioSesion(): Usuario {
		let user_str = localStorage.getItem('usuario');
		if (user_str == null)
			return null;

		let user_data = this.transformJson(user_str);

		return user_data.usuario;
	}

	public get currentUserValue() {
		return this.currentUserSubject.value;
	}

	doLogin(usuario: string, contrasena: string): Observable<LoginResponse> {
		console.log('url',this.urlBase);
		let result = this.http.post<any>(`${this.urlBase}/login.php`, { usuario, contrasena }, { withCredentials: true })
			.pipe(map(response => {
				if (response && response.sesion.id) {
					localStorage.setItem("usuario", JSON.stringify(response));
					localStorage.setItem('session_token', response.sesion.id);
					this.currentUserSubject.next(response);
				}
				return response;
			}));
		return result;
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.clear();
		// localStorage.removeItem('usuario');
		// localStorage.removeItem('session_token');
		// localStorage.removeItem('id_organizacion');
		this.currentUserSubject.next(null)
	}


	transformJson(response) {
		return JSON.parse(response, (key, value) => {
			if (typeof value === "string") {
				if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
					let components = value.split(/-|:|\s/g);
					let utcTime = Date.UTC(
						parseInt(components[0]),
						parseInt(components[1]) - 1,
						parseInt(components[2]),
						parseInt(components[3]),
						parseInt(components[5])
					);
					let localTime = new Date();
					localTime.setTime(utcTime);
					return localTime;
				}
			}
			return value;
		});
	}

	getFilePath(file_id: number): string {
		return this.urlBase + '/attachment.php?id=' + file_id;
	}

	getImagePath(image1_id: number, image2_id: number = null, image3_id: number = null, image4_id: number = null, image5_id: number = null): string {
		//console.log(image1_id,image2_id,image3_id,image4_id,image5_id);

		if (image1_id)
			return this.urlBase + '/image.php?id=' + image1_id;

		//console.log('dos');
		if (image2_id)
			return this.urlBase + '/image.php?id=' + image2_id;

		//console.log('tres');
		if (image3_id)
			return this.urlBase + '/image.php?id=' + image3_id;

		//console.log('cuatro');
		if (image4_id)
			return this.urlBase + '/image.php?id=' + image4_id;

		//console.log('cinco');
		return this.urlBase + '/image.php?id=' + image5_id;
	}


	/* 2019-04-03 */

	getLocalDateFromMysqlString(str: string): Date {
		if (str == null)
			return null;

		let components = str.split(/-|:|\s/g);
		if (components.length == 3)
			components.push('0', '0', '0');

		let d = new Date(parseInt(components[0]), //Year
			parseInt(components[1]) - 1, //Month
			parseInt(components[2]), //Day
			parseInt(components[3]), //Hour
			parseInt(components[4])) //Minutes
		return d;
	}

	getDateFromMysqlString(str: string): Date {
		let components = str.split(/-|:|\s/g);
		let utcTime = Date.UTC(
			parseInt(components[0]),
			parseInt(components[1]) - 1,
			parseInt(components[2]),
			parseInt(components[3]),
			parseInt(components[4])
		);

		let d = new Date();
		d.setTime(utcTime);
		return d;
	}

	getMysqlStringFromLocalDate(d: Date): string {
		let event_string = d.getFullYear()
			+ '-' + this.zero(d.getMonth() + 1)
			+ '-' + this.zero(d.getDate())
			+ ' ' + this.zero(d.getHours())
			+ ':' + this.zero(d.getMinutes())
			+ ':' + this.zero(d.getSeconds());

		return event_string;
	}

	getMysqlStringFromDate(d: Date): string {
		let event_string = d.getUTCFullYear()
			+ '-' + this.zero(d.getUTCMonth() + 1)
			+ '-' + this.zero(d.getUTCDate())
			+ ' ' + this.zero(d.getUTCHours())
			+ ':' + this.zero(d.getUTCMinutes())
			+ ':' + this.zero(d.getUTCSeconds());

		return event_string;
	}

	getErrorString(error): string {
		if (error == null || error === undefined)
			return 'Error desconocido';

		if (typeof error === "string")
			return error;

		if ('error' in error) {
			if (typeof (error.error) == 'string') {
				return error.error;
			}
			if (error.error && 'error' in error.error && error.error.error) {
				return error.error.error;
			}
		}

		if (error instanceof HttpErrorResponse) {
			return error.statusText;
		}
		else if ('message' in error && typeof (error.message) === "string") {
			return error.message;
		}

		console.log('Error desonocido', error);
		return 'Error desconocido';
	}

	showSuccess(msg: string): void {
		this.showErrorMessage(new ErrorMessage(msg, 'alert-success'));
	}

	showError(error: any) {
		console.log('Error to display is', error);
		if (error instanceof ErrorMessage) {
			this.showErrorMessage(error);
			return;
		}

		let str_error = this.getErrorString(error);
		this.showErrorMessage(new ErrorMessage(str_error, 'alert-danger'));
	}

	showErrorMessage(error: ErrorMessage) {
		this.errorBehaviorSubject.next(error);
	}
	uploadImage(file: File, is_private: boolean = false): Observable<Imagen> {
		let fd = new FormData();
		fd.append('image', file, file.name);
		fd.append('is_private', is_private ? '1' : '0');
		return this.http.post(`${this.urlBase}/image.php`, fd, { headers: this.getSessionHeaders(), withCredentials: true });
	}

	uploadAttachment(file: File, is_private: boolean = false): Observable<Attachment> {
		let fd = new FormData();
		fd.append('file', file, file.name);
		fd.append('is_private', (is_private ? '1' : '0'));
		return this.http.post<Attachment>(`${this.urlBase}/attachment.php`, fd, { headers: this.getSessionHeaders(), withCredentials: true });
	}

	public hideMenu(): void {
		document.body.classList.remove('menu_open');
	}

	toggleMenu(): void {
		document.body.classList.toggle('menu_open');
	}

	scrollTop() {
		let x = document.querySelector('.page_content>.custom_scrollbar');
		if (x)
			x.scrollTo(0, 0);
	}

	xlsx2json(file: File, headers): Promise<any> {
		if (file == null)
			return Promise.reject();

		return new Promise((resolve, reject) => {
			const reader: FileReader = new FileReader();

			reader.onload = (e: any) => {
				/* read workbook */
				const bstr: string = e.target.result;
				const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

				console.log('Names are', wb.SheetNames);

				/* grab first sheet */
				const wsname: string = wb.SheetNames[0];
				const ws: XLSX.WorkSheet = wb.Sheets[wsname];

				//console.log( ws );
				/* save data */
				let data = XLSX.utils.sheet_to_json(ws, { header: headers });
				data.splice(0, 1);
				//console.log( data );
				resolve(data);
			};
			reader.readAsBinaryString(file);
		});
	}

	xlsx2RawRows(file: File): Promise<any[]> {
		if (file == null)
			return Promise.reject();

		return new Promise((resolve, reject) => {
			const reader: FileReader = new FileReader();

			reader.onload = (e: any) => {
				/* read workbook */
				const bstr: string = e.target.result;
				const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

				/* grab first sheet */
				const wsname: string = wb.SheetNames[0];
				const ws: XLSX.WorkSheet = wb.Sheets[wsname];

				//console.log( ws );
				let data = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false });
				resolve(data);
			};
			reader.readAsBinaryString(file);
		});
	}

	array2xlsx(array: any[], filename: string, headers: string[]) {
		let ws = XLSX.utils.json_to_sheet(array, { header: headers });
		let wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, filename);
		let x = XLSX.writeFile(wb, filename);
		//console.log( x );
	}





	csv2json(file: File, header: boolean, delimiter: string): Observable<any> {
		return this.ngxCsvParser.parse(file, { header, delimiter });
	}

	zero(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}


}
