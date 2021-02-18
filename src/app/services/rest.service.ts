import { Injectable } from '@angular/core'; import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Rest, RestResponse } from './Rest';
import { Cotizacion_Info, LoginResponse, Servicio_Info, Servicio_Recurso_Info } from '../models/Respuestas';
import { Bitacora, Cotizacion, Servicio, Servicio_Categoria, Unidad_De_Medida,} from '../models/RestModels';
import { NumberDictionary, StringDictionary } from '../models/models';
import { Cliente } from '../models/RestModels';
import { Distribuidor } from '../models/RestModels';
import { File_Type } from '../models/RestModels';
import { Imagen } from '../models/RestModels';
import { Organizacion } from '../models/RestModels';
import { Sesion } from '../models/RestModels';
import { Sucursal } from '../models/RestModels';
import { Usuario } from '../models/RestModels';
import { Attachment } from '../models/RestModels'
import { Distribuidor_Direccion } from '../models/RestModels';
import { Requisicion } from '../models/RestModels';
import { Proveedor } from '../models/RestModels';

//import { forkJoin } from 'rxjs';

// import { NgxCsvParser } from 'ngx-csv-parser';

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
	public bitacora: Rest<Bitacora, Bitacora> = this.initRest('bitacora');
	public file_type: Rest<File_Type, File_Type> = this.initRest('file_type');
	public organizacion: Rest<Organizacion, Organizacion> = this.initRest('organizacion');
	public sesion: Rest<Sesion, Sesion> = this.initRest('sesion');
	public sucursal: Rest<Sucursal, Sucursal> = this.initRest('sucursal');
	public usuario: Rest<Usuario, Usuario> = this.initRest('usuario');
	public cliente: Rest<Cliente, Cliente> = this.initRest('cliente');
	public proveedor: Rest<Proveedor, Proveedor> = this.initRest('proveedor');
	public servicio_categoria: Rest<Servicio_Categoria, Servicio_Categoria> = this.initRest('servicio_categoria');
	public unidad_de_medida: Rest<Unidad_De_Medida, Unidad_De_Medida> = this.initRest('unidad_de_medida');
	public servicio: Rest<Servicio, Servicio> = this.initRest('servicio');
	public cotizacion: Rest<Cotizacion, Cotizacion> = this.initRest('cotizacion');
	public cotizacion_info: Rest<Cotizacion, Cotizacion_Info> = this.initRest('cotizacion_info');
	public servicio_info: Rest<Servicio, Servicio_Info> = this.initRest('servicio_info');


	constructor(private http: HttpClient) {
		//Produccion por cambiarx`x
		this.keyUpObserver = fromEvent<KeyboardEvent>(window.document.body, 'keyup');

		this.errorBehaviorSubject = new BehaviorSubject<ErrorMessage>(null);
		this.errorObservable = this.errorBehaviorSubject.asObservable();

		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuario')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	getUrlBase() {

		if (window.location.hostname.indexOf('127.0.') == 0 || window.location.hostname.indexOf('192.168') == 0)
			return window.location.protocol + '//' + window.location.hostname + '/CotizacionManager';

		if (window.location.hostname.indexOf('localhost') == 0)
			return window.location.protocol + '//127.0.0.1/CotizacionManager';

		return "http://127.0.0.53/CotizacionManager/api"
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





	// csv2json(file: File, header: boolean, delimiter: string): Observable<any> {
	// 	return this.ngxCsvParser.parse(file, { header, delimiter });
	// }

	zero(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}


}
