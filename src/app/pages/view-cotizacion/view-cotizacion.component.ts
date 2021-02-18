import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../base/base.component';
import { forkJoin } from 'rxjs';
import { Cliente, Cotizacion, Cotizacion_Detalle, Proveedor, Servicio, Servicio_Categoria, Sucursal, Unidad_De_Medida, Usuario } from '../../models/RestModels';
import { Organizacion } from '../../models/RestModels';
import { Imagen } from '../../models/RestModels';
import { NumberDictionary } from 'src/app/models/models';
import { Cotizacion_Detalle_Info, Cotizacion_Info } from 'src/app/models/Respuestas';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-view-cotizacion',
    templateUrl: './view-cotizacion.component.html',
    styleUrls: ['./view-cotizacion.component.css']
})
export class ViewCotizacionComponent extends BaseComponent implements OnInit {
    fecha_actual
    control = new FormControl();
    cotizacion_info: Cotizacion_Info = {
        cotizacion: {
            'id': null,
            'id_cliente': null,
            'id_usuario': null,
            'flete': null,
            'costo': null,
            'iva': null,
            'costo_total': null,
            'tipo_de_pago': null,
            'fecha_de_entrega': null,
            'nota': '',
        },
        cotizacion_detalles: []
    };
    organizacion_list: Organizacion[] = [];
    imagen_list: Imagen[] = [];
    // diccionarios
    usuario_diccionario: NumberDictionary<Usuario> = {};
    cliente_diccionario: NumberDictionary<Cliente> = {};
    categoria_diccionario: NumberDictionary<Servicio_Categoria> = {};
    unidad_m_diccionario: NumberDictionary<Unidad_De_Medida> = {};
    cotizacion_detalle_categoria={};
    session
    cliente_list: Cliente[] = [];
    categoria_list: Servicio_Categoria[] = [];
    sucursal: Sucursal;
    //Variables generales subtotal,iva8,iva16,total
    total_iva_8 = 0;
    total_iva_16 = 0;
    // busqueda de servicios
    search_item: string = '';
    search_servicios: Servicio[] = [];
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            //this.company = this.rest.getCompanyFromSession();
            let date: Date = new Date();
            this.fecha_actual = this.rest.getMysqlStringFromDate(date);
            let id_cotizacion = parseInt(params.get('id'));
            this.session = this.rest.getUsuarioSesion();
            console.log('session', this.session);
            this.is_loading = true;
            if (id_cotizacion) {
                forkJoin({
                    cotizacion_info: this.rest.cotizacion_info.get(id_cotizacion),
                    sucursal: this.rest.sucursal.get(this.session.id_sucursal),
                    unidad_de_medida: this.rest.unidad_de_medida.search({}),
                    usuario: this.rest.usuario.search({}),
                    cliente: this.rest.cliente.search({}),
                    servicio_categoria: this.rest.servicio_categoria.search({})

                })
                    .subscribe((responses) => {
                        this.cotizacion_info = responses.cotizacion_info;
                        this.cliente_list = responses.cliente.data;
                        this.categoria_list = responses.servicio_categoria.data;
                        responses.usuario.data.forEach((usuario) => {
                            this.usuario_diccionario[usuario.id] = usuario;
                        });
                        responses.cliente.data.forEach((cliente) => {
                            this.cliente_diccionario[cliente.id] = cliente;
                        });
                        responses.unidad_de_medida.data.forEach((unidad_de_medida) => {
                            this.unidad_m_diccionario[unidad_de_medida.id] = unidad_de_medida;
                        });
                        responses.servicio_categoria.data.forEach((servicio_categoria) => {
                            this.categoria_diccionario[servicio_categoria.id] = servicio_categoria;
                        });
                        // responses.cotizacion_info.cotizacion_detalles.forEach(element => {
                        //     if(element.servicio.)
                        // });
                        this.ordenarPorCategoria(responses.servicio_categoria.data, responses.cotizacion_info);

                        this.sucursal = responses.sucursal;
                        this.calcularTotalCotizacion();
                        this.is_loading = false;
                    }, (error) => this.showError(error));
            }

        });
    }
    ordenarPorCategoria(categorias, cotizaciones: Cotizacion_Info) {

        let categorias_detalles = {};
        let servicios = [];
        let servicios_indefinidos = [];
        categorias.forEach(categoria => {
            cotizaciones.cotizacion_detalles.forEach(detalle => {
                if (categoria.id == detalle.servicio.id_categoria) {
                    servicios.push(detalle);
                    // categorias_detalles[categoria.nombre] = servicios;
                }

                if(!detalle.servicio.id_categoria){
                    servicios_indefinidos.push(detalle);
                }
                // }

            });

            if(servicios.length){
                categorias_detalles[categoria.nombre] = servicios;
            }

            // si la categoria otros no existe, lo pondra en temporar, probablemente exista un error cuando
            //no exista la categoria en la base de datos
            // preferiblemente que todos los productos tengan una categoria
            if(servicios_indefinidos.length){
                categorias_detalles['OTRO'] = servicios_indefinidos;
            }

            servicios = []
            servicios_indefinidos = []
        })
        this.cotizacion_detalle_categoria = categorias_detalles;
        console.log(categorias_detalles);
    }

    // buscarCategorias() {
    //     let categoria_list = []
    //     this.categoria_list.forEach(categoria => {
    //         this.cotizacion_detalle_categoria.forEach(element => {
    //             categoria_list = this.cotizacion_detalle_categoria[categoria.id].servicio;
    //         });

    //     })
    //     return categoria_list;
    // }
    asd() {
        // this.cotizacion_detalle_categoria.forEach(element => {
        //     console.log(element);
        // });
        for (let asdf in this.cotizacion_detalle_categoria) {
            for(let as of this.cotizacion_detalle_categoria[asdf]){
                console.log('hola22',as);

            }

          }
        // console.log(this.cotizacion_detalle_categoria);
    }
    changeSearchServicio(evt) {
        this.rest.servicio.search({
            lk: { nombre: evt.target.value }
            , eq: { id_organizacion: this.session.id_organizacion, }
        }).subscribe((response) => {
            this.search_servicios = response.data;
        });
    }

    agregarServicio(servicio: Servicio) {

        let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == servicio.id);

        if (index > -1) {
            this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.cantidad++;
        }
        else {
            this.cotizacion_info.cotizacion_detalles.push({
                servicio: servicio
                , cotizacion_detalle: { id_servicio: servicio.id, cantidad: 1, }
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
            if (i.cotizacion_detalle.precio == null) {
                i.cotizacion_detalle.precio = i.servicio.costo;
                i.cotizacion_detalle.iva = i.servicio.iva;
                i.cotizacion_detalle.costo_iva = (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad) * (0.01 * i.cotizacion_detalle.iva);
            }
            //cantidad correspondiente al iva del producto
            i.cotizacion_detalle.costo_iva = (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad) * (0.01 * i.cotizacion_detalle.iva);
            //costo total correspondiente al producto
            i.cotizacion_detalle.costo_total = i.cotizacion_detalle.precio + i.cotizacion_detalle.costo_iva;
            // suma de los totales de iva de los productos 8 y 16
            if (i.cotizacion_detalle.iva == 8) {
                total_iva_8 += i.cotizacion_detalle.costo_iva;
            } else if (i.cotizacion_detalle.iva == 16) {
                total_iva_16 += i.cotizacion_detalle.costo_iva;
            }
            costo_iva_total += (i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad) * (0.01 * i.cotizacion_detalle.iva);

            //subtota/

            costo += i.cotizacion_detalle.precio * i.cotizacion_detalle.cantidad;
        }
        costo_total = (costo + costo_iva_total + flete);
        this.total_iva_8 = total_iva_8;
        this.total_iva_16 = total_iva_16;
        this.cotizacion_info.cotizacion.costo_iva = costo_iva_total;
        this.cotizacion_info.cotizacion.costo = costo;

        // costo_iva = costo*(0.1*iva);
        this.cotizacion_info.cotizacion.costo_total = costo_total;
        console.log('costototal', this.cotizacion_info.cotizacion.costo_total);

    }

    aumentarCantidad(servicio: Servicio) {

        let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == servicio.id);

        if (index > -1) {
            this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.cantidad;
        }


        this.calcularTotalCotizacion();
        console.log('Agregando Servicio', servicio);
    }
    aumentarPrecio(servicio: Servicio) {

        let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == servicio.id);

        if (index > -1) {
            this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.precio;
        }


        this.calcularTotalCotizacion();
        console.log('Agregando Servicio', servicio);
    }

    aumentarIva(servicio: Servicio) {

        let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == servicio.id);

        if (index > -1) {
            this.cotizacion_info.cotizacion_detalles[index].cotizacion_detalle.iva;
        }


        this.calcularTotalCotizacion();
        console.log('Agregando Servicio', servicio);
    }

    eliminar(sd) {
        let index = this.cotizacion_info.cotizacion_detalles.findIndex(i => i.servicio.id == sd.servicio.id);
        if (index > -1)
            this.cotizacion_info.cotizacion_detalles.splice(index, 1);
        else
            console.log("Se elimino el articulo no. :", index);

        this.calcularTotalCotizacion();
    }


    save() {
        this.is_loading = true;

        if (this.cotizacion_info.cotizacion.id) {
            console.log('coti', this.cotizacion_info);
            this.rest.cotizacion_info.update(this.cotizacion_info).subscribe((cotizacion_info) => {
                this.is_loading = false;
                this.router.navigate(['/list-cotizacion']);
            }, (error) => this.showError(error));
        }
        else {
            this.rest.cotizacion_info.create(this.cotizacion_info).subscribe((cotizacion_info) => {
                this.is_loading = false;
                this.router.navigate(['/list-cotizacion']);
            }, (error) => this.showError(error));
        }
    }

}
