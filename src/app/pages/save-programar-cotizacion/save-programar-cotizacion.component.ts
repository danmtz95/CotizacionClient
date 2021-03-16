import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import { Cliente, Cotizacion_Programada, Proveedor, Usuario } from '../../models/RestModels';
import { Organizacion } from '../../models/RestModels';
import { Imagen } from '../../models/RestModels';
import { NumberDictionary } from 'src/app/models/models';


@Component({
	selector: 'app-save-programar-cotizacion',
	templateUrl: './save-programar-cotizacion.component.html',
	styleUrls: ['./save-programar-cotizacion.component.css']
})
export class SaveProgramarCotizacionComponent extends BaseComponent implements OnInit {


	cotizacion_programada: Cotizacion_Programada = {};
	organizacion_list: Organizacion[] = [];
	cliente_list: Cliente[] = [];
	cliente_diccionario: NumberDictionary<Cliente> = {};
	imagen_list: Imagen[] = [];
	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			//this.company = this.rest.getCompanyFromSession();

			let id_cotizacion_programada = parseInt(params.get('id'));
			let session = this.rest.getUsuarioSesion();
			this.is_loading = true;
			if (id_cotizacion_programada) {
				forkJoin({
					cotizacion_programada: this.rest.cotizacion_programada.get(id_cotizacion_programada),
					cliente: this.rest.cliente.search({}),
				})
					.subscribe((responses) => {
						this.cotizacion_programada = responses.cotizacion_programada;
						this.cliente_list = responses.cliente.data;
						responses.cliente.data.forEach((cliente) => {
							this.cliente_diccionario[cliente.id] = cliente;
						});

						this.is_loading = false;
					}, (error) => this.showError(error));
			} else {
				this.cotizacion_programada.id_organizacion = session.id_organizacion;
				this.cotizacion_programada.id_sucursal = session.id_sucursal;
				this.cotizacion_programada.id_usuario = session.id;
				this.cotizacion_programada.id_cliente = null;
				this.is_loading = false;
				forkJoin({
					cliente: this.rest.cliente.search({}),
				})
					.subscribe((responses) => {
						this.cliente_list = responses.cliente.data;

						responses.cliente.data.forEach((cliente) => {
							this.cliente_diccionario[cliente.id] = cliente;
						});

						this.is_loading = false;
					}, (error) => this.showError(error));

			}

		});
	}

	save() {
		this.is_loading = true;

		if (this.cotizacion_programada.id) {
			this.rest.cotizacion_programada.update(this.cotizacion_programada).subscribe((cotizacion_programada) => {
				this.is_loading = false;
				this.router.navigate(['/list-programar-cotizacion']);
			}, (error) => this.showError(error));
		}
		else {
			this.rest.cotizacion_programada.create(this.cotizacion_programada).subscribe((cotizacion_programada) => {
				this.is_loading = false;
				this.router.navigate(['/list-programar-cotizacion']);
			}, (error) => this.showError(error));
		}
	}

}
