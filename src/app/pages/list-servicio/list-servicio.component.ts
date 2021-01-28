import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario,Servicio,} from '../../models/RestModels';
import {Router,ActivatedRoute} from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from	'@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from '../../models/Respuestas';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent extends BaseComponent implements OnInit {


	TEMPLATE_HEADERS_SIZE = 10;
	file:File = null;
	show_import:boolean = false;
	session;
	servicio_list:Servicio[]= [];
	is_loading:boolean = false;
	servicio_search:SearchObject<Servicio>;

	ngOnInit() {
		this.session = this.rest.getUsuarioSesion();
			// console.log('imprimiendo organizacion',this.centro_medico);
		this.route.queryParams.subscribe( params =>
		{

			this.servicio_search = {
				eq: { id_organizacion: this.session.id_organizacion, id_sucursal: this.session.id_sucursal },
				gt: {},
				ge: {},
				le: {},
				lt: {},
				lk: {},
				csv: {},
			};
			this.titleService.setTitle('Servicios')
			this.servicio_search.lk.codigo	= "lk.codigo" in params ?params["lk.codigo"]:null;
			this.servicio_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
			this.servicio_search.limite			= this.pageSize;
			this.servicio_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
			this.is_loading = true;

			this.rest.servicio.search( this.servicio_search ).subscribe((respuesta)=>
			{
				this.servicio_list = respuesta.data;
				this.setPages( this.servicio_search.pagina, respuesta.total );
				this.is_loading = false;
			},error=> this.showError(error));
		});
	}

	changeSearch(nombre:string)
	{

	}

	search()
	{
		this.is_loading = true;
		this.servicio_search.pagina= 0;
		this.servicio_search.lk.id_organizacion =this.session.id_organizacion;
		this.servicio_search.lk.codigo	= this.servicio_search.lk.nombre;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.servicio_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.servicio_search[i])
                    search[i+'.'+j] = this.servicio_search[i][j];
            }
        }
		console.log( search );
		this.router.navigate(['servicios'],{queryParams: search});
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
		this.rest.xlsx2json( this.file,["id","proveedor","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion"]).then((json)=>
		{
			//Filter json then upload
			this.rest.servicio.batchUpdate(json).subscribe((result)=>
			{
				if( this.servicio_list.length == 0 )
				{
					this.setPages( 0, result.length );
					this.servicio_list = result.slice(0,this.pageSize);
				}
				this.is_loading =  false;
                this.show_import = false;
                this.showSuccess('Imported succesfully '+result.length+' items');

			},(error)=>this.showError(error));
		});
	}

	exportFile()
	{
		this.is_loading = true;
		this.rest.servicio.search({limit:100000}).subscribe((response)=>
		{
			this.rest.array2xlsx(response.data,'servicio_list.xlsx',["id","usuario","nombre","id_centro_medico","id_organizacion","id_imagen","tipo","id_tipo_precio","id_device_notification","contrasena","telefono","correo_electronico","factura_rfc","factura_razon_social","factura_codigo_postal","factura_correo_electronico","id_aseguranza","numero_aseguranza","tiempo_creacion","tiempo_actualizacion"])
			this.is_loading = false;
		},(error)=>this.showError(error));
	}


}
