
import { Orden_Detalle, Distribuidor, Equivalencia, Cliente, Flor, Color, Material, Producto_Detalle, Producto, Orden } from 'src/app/models/RestModels';
import { OrdenDetalleInfo, ProductoInfo,OrdenInfo } from 'src/app/models/models';
import { NumberDictionary, StringDictionary } from 'src/app/models/models';

export interface ProductoOrdenDetalle
{
	productoInfo?: ProductoInfo;
	orden_detalle?:Orden_Detalle;
	filename?:string,
	orden?:Orden;
	raw_data_json?:any[];
}

export class SunValleyParser {

	products:ProductoInfo[] = [];
	lastProducto:ProductoInfo = null;
	flor_diccionario:NumberDictionary<Flor> = {};
	color_diccionario:NumberDictionary<Color> = {};
	material_list:Material[] = [];
	cliente_list:Cliente[] = [];

	constructor(flor_diccionario:NumberDictionary<Flor>, color_diccionario:NumberDictionary<Color>,material_list:Material[],cliente_list:Cliente[])
	{
		this.flor_diccionario	= flor_diccionario;
		this.color_diccionario	= color_diccionario;
		this.material_list		= material_list;
		this.cliente_list		= cliente_list;
	}

	getOrdenes(detalles:ProductoOrdenDetalle[],producto_info_list:ProductoInfo[]):OrdenInfo[]
	{
		let result:OrdenInfo[] = [];
		let last_orden:OrdenInfo = null;

		detalles.forEach((pod:ProductoOrdenDetalle,index)=>
		{
			let producto:ProductoInfo =  producto_info_list.find(i=>i.producto.codigo == pod.productoInfo.producto.codigo);

			if( producto == undefined )
			{
				throw 'Producto "'+pod.productoInfo.producto.codigo+'" No se encontro';
			}

			pod.orden_detalle.id_producto = producto.producto.id;


			if( last_orden == null ||  last_orden.orden.numero_orden_distribuidor  != pod.orden.numero_orden_distribuidor )
			{
				pod.orden.cantidad_de_tallos = pod.orden_detalle.cantidad_de_tallos;
				last_orden = {
					orden: pod.orden,
					orden_detalles: [
						{ orden_detalle: pod.orden_detalle, producto: producto.producto  }
					]
				};
				result.push( last_orden );
			}
			else
			{
				last_orden.orden_detalles.push({
					orden_detalle: pod.orden_detalle,
					producto: producto.producto
				});
				last_orden.orden.cantidad_de_tallos += pod.orden_detalle.cantidad_de_tallos;
			}
		});

		return result;
	}

	getRowFromJson(json:any):string
	{
		let fields = {
			cantidad_de_cajas: " # of Cases",
			box_code: " Box Code / SKU",
			box_type: " Box Type",
			bunch_qty: " BunchQty",
			ramos_por_caja: " Bunches per Box",
			customer_po_number: " Customer PO Number",
			customer_ship_to: " Customer Ship To",
			"date code": " Date Code",
			"description": " Description",
			dest_carrier: " Dest Carrier",
			"fob_price": " FOB Price",
			load_date: " Load Date",
			"order_ship_date": " Order Ship Date",
			orig_carrier: " Orig Carrier",
			product_category: " Product Category",
			sku: " SKU",
			sku_desc: " SKU Desc",
			sales_rep_name: " Sales Rep Name / Number",
			"steam_bunch": " Stem/Bunch",
			numero_orden_distribuidor: " Sun Valley Order",
			UPC_NUMBER: " UPC #",
			"UPC TYPE": " UPC Type / Sleeve Name & Size / Insert / Flower Food",
			"unit_price": " Unit Price",
			customer_name: "Customer Name / Acct #",
		};

		return '';
	}

	getProductosFromSunValley(json:any,filename:string):ProductoOrdenDetalle[]
	{
		let result:ProductoOrdenDetalle[] = [];

		let fields = {
			cantidad_de_cajas: " # of Cases",
			box_code: " Box Code / SKU",
			box_type: " Box Type",
			bunch_qty: " BunchQty",
			ramos_por_caja: " Bunches per Box",
			customer_po_number: " Customer PO Number",
			customer_ship_to: " Customer Ship To",
			"date code": " Date Code",
			"description": " Description",
			dest_carrier: " Dest Carrier",
			"fob_price": " FOB Price",
			load_date: " Load Date",
			"order_ship_date": " Order Ship Date",
			orig_carrier: " Orig Carrier",
			product_category: " Product Category",
			sku: " SKU",
			sku_desc: " SKU Desc",
			sales_rep_name: " Sales Rep Name / Number",
			"steam_bunch": " Stem/Bunch",
			numero_orden_distribuidor: " Sun Valley Order",
			UPC_NUMBER: " UPC #",
			"UPC TYPE": " UPC Type / Sleeve Name & Size / Insert / Flower Food",
			"unit_price": " Unit Price",
			customer_name: "Customer Name / Acct #",
		};

		let previous_name:string = null;
		let previous_customer:string = null;
		let current_product_skus:string[] = [ ];
		let current_cliente:Cliente = null;
		let current_box_code:string = null;
		let current_upc:string	= null;
		let current_raw_details:any [] =[];
		let current_product:ProductoInfo = null;
		let current_orden:Orden = null;
		let current_orden_detalle: Orden_Detalle = null;

		let sumaBunches					= 0;

		for (let data of json) {

			let p_sku		= data[ fields.sku ].trim();
			let tallos_por_ramo:number		= parseInt( p_sku.substring(8), 10 );
			let color_str:string	= p_sku.substring(4,7);
			let flor_str:string		= p_sku.substring(1,4);

			let flor:Flor	= this.flor_diccionario[ flor_str ];
			let color:Color	= this.color_diccionario[ color_str ];

			let totalBunches = parseInt( data[ fields.cantidad_de_cajas ], 10 )*parseInt( data[fields.ramos_por_caja ], 10 );

			let bunches:number	= parseInt( data[fields.bunch_qty ], 10 );
			let total_de_cajas:number	= parseInt( data[ fields.cantidad_de_cajas ], 10);

			if( previous_name != null
				&& previous_name == data[ fields.description ].trim()
				&& totalBunches > sumaBunches && (sumaBunches+bunches) <= totalBunches  )
			{

				sumaBunches += bunches;
				let ramosDeFlorPorCaja:number = bunches/ total_de_cajas;
				current_product_skus.push( p_sku+'+'+ramosDeFlorPorCaja );
				current_raw_details.push( data );


				current_product.detalles.push(
				{
					producto_detalle:
					{
						id_ramo	: p_sku,
						cantidad_de_tallos: ( bunches/ total_de_cajas )* tallos_por_ramo,
						cantidad_de_ramos: ramosDeFlorPorCaja,
						nota: JSON.stringify(data)
					}
				});

				previous_name = data[ fields.description ].trim();

				if( (sumaBunches ) == totalBunches )
				{
					current_product.producto.codigo = this.getCodigo( current_cliente, current_box_code, current_upc, current_product,current_product_skus);
					current_orden_detalle.raw_data_json = JSON.stringify( current_raw_details );

					result.push({
						productoInfo: current_product,
						orden_detalle:  current_orden_detalle,
						orden: current_orden
					});

					current_product_skus = [];
					current_raw_details = [];
					sumaBunches = 0;
					current_product = null;
					previous_name = null;
				}
			}
			else
			{
				if( current_product !== null )
				{
					current_product.producto.codigo = this.getCodigo( current_cliente, current_box_code, current_upc, current_product,current_product_skus);
					current_product.producto.aparecio_por_primera_vez_en_archivo = filename;
					current_orden_detalle.raw_data_json = JSON.stringify( current_raw_details );

					result.push({
						productoInfo: current_product,
						orden_detalle:  current_orden_detalle,
						orden: current_orden
					});
					sumaBunches = 0;
				}


				current_orden_detalle = {
						cantidad_de_cajas : total_de_cajas,
						cantidad_de_ramos: totalBunches,
						cantidad_de_tallos : totalBunches*tallos_por_ramo
				};

				current_cliente		= this.getCliente( data[ fields.customer_name ] );
				current_box_code	= data[ fields.box_code ];
				current_upc			= data[ fields.UPC_NUMBER ].trim();


				if( current_cliente == null )
					throw 'El cliente '+data[ fields.customer_name ]+' no esta registrado';

				let components = data[fields.load_date].split('/').map(i => parseInt(i, 10));
				let load_date = components[2] + '-' + this.zero(components[0]) + '-' + this.zero(components[1]);

				current_orden = {
					numero_orden_distribuidor: data[fields.numero_orden_distribuidor].trim().replace(/\s+/g, ' '),
					tipo_orden: 'POR_CAJA',
					id_distribuidor: 1, //el id de sunvalley es 1
					sales_rep_name: data[fields.sales_rep_name],
					customer_ship_to: data[fields.customer_ship_to],
					customer_name: data[fields.customer_name],
					origi_carrier: data[fields.orig_carrier],
					dest_carrier: data[fields.dest_carrier],
					shipping_date: data[fields.order_ship_date],
					load_date: load_date,
					numero_orden_distrubuidor: null
				}


				let ramosDeFlorPorCaja:number = bunches/ total_de_cajas;
				let ramosPorCaja	 =  parseInt( data[fields.ramos_por_caja ], 10 );
				//console.log( 'Ramos por caja', ramosPorCaja );
				current_product_skus = [];
				current_raw_details = [];

				current_product_skus.push( p_sku+'+'+ramosDeFlorPorCaja );
				current_raw_details.push( data );


				let nombre  = data[ fields.description ].trim();

				if( nombre == '' )
					nombre = data[ fields.product_category ].trim();

				//current_box_code = data[ fields.

				current_product = {
					producto: {
						nombre: data[ fields.description ].trim(),
						ramos_por_caja: ramosPorCaja,
						ramos_por_hora: 120,
						aparecio_por_primera_vez_en_archivo: filename
					},
					detalles:[{
						producto_detalle: {
							id_ramo: p_sku,
							//cantidad_de_tallos: parseInt(tallos,10),
							cantidad_de_tallos: ( bunches/ total_de_cajas)*tallos_por_ramo,
							cantidad_de_ramos: ramosDeFlorPorCaja,
							//cantidad_de_tallos:  tallos_por_ramo*tallos_por_ramo,
							nota: JSON.stringify( data )
						}
					}],
					materiales:[]
				};

				let material:Material = this.getBoxMaterial(data[fields.box_type] );

				if( material !== null )
				{
					current_product.materiales.push({
						material,
						producto_material:{ tipo_multiplicador: 'POR_CAJA',id_material: material.id, cantidad: 1 }
					});
				}

				previous_name = data[ fields.description ].trim();
				previous_customer = data[fields.customer_ship_to].trim();
				sumaBunches += parseInt( data[ fields.bunch_qty ], 10 );
			}
		}

		if( current_product !== null )
		{

			current_product.producto.codigo = this.getCodigo( current_cliente, current_box_code, current_upc, current_product,current_product_skus);
			current_orden_detalle.raw_data_json = JSON.stringify( current_raw_details );
			current_raw_details = [];

			result.push({
				productoInfo: current_product,
				orden_detalle: current_orden_detalle,
				orden: current_orden
			});
		}

		return result;
	}

	zero(n:number):string
	{
		return n<10? '0'+n : ''+n;
	}

	getCliente(cliente_codigo:string):Cliente
	{
		let tmp = cliente_codigo.replace(/\s+/g,'').trim();
		console.log('Codigo del cliente', tmp );
		return this.cliente_list.find(c=>c.codigo == tmp ) || null;
	}

	getBoxMaterial( sunvalleCode:string ):Material
	{
		let codes = {
			'`PV D BOX'			: null,
			'~1/2 L BAJA BOX'	: null,
			'~B29 (H6)'			: 'H6',
			'~B29 13X20X29'		: 'H6',
			'~B29 BAJA PRODUCT'	: 'H6',
			'~B34 BAJA PRODUCT'	: 'H3',
			'~BAJA P29 (H8)'	: 'H8',
			'~H29 (H2)'			: 'H2',
			'~H29 BAJA PRODUCT'	: 'H2',
			'~H34 BAJA PRODUCT'	: 'H3',
			'~INSUL 1/2L BOX'	: null,
			'~L BOX INSUL'		: null,
			'~M27 (H5)'			: 'H5',
			'~M27 BAJA PRODUCT'	: 'H5',
			'~PV "5 G. BUCKET"'	: null,
			'~PV 1/2 L BOX'		: null,
			'~PV L BOX'			: null,
			'GC 8" 1/4 BOX'		: 'F4',
			'~L BOX BAJA PRODUCT'	: null,
			'~D BOX BAJA PRODUCT'	: null
		};

		let c = sunvalleCode in codes ? codes[ sunvalleCode ] : null;

		if(  c === null )
			return null;

		let material:Material = this.material_list.find(m=>m.id == c );

		return material || null;
	}

	getCodigo(cliente:Cliente,box_code:string,upc:string,productoInfo:ProductoInfo,current_product_skus:string[])
	{
		console.log('Current Box Code', box_code );

		let id_cliente:number =  cliente.id_cliente_principal == null ? cliente.id : cliente.id_cliente_principal;
		current_product_skus.sort();

		let indexDash:number	= box_code.indexOf('-');
		let index:number	= 	box_code.indexOf('/');

		if( index > -1 && indexDash > -1 )
		{
			index = Math.min( index, indexDash );
		}

		let code:string		= index > -1 ? box_code.substring(0,index).trim(): productoInfo.producto.nombre;
		let codigo:string = ''+id_cliente+'+'+upc+'*'+code+'|'+current_product_skus.join('=');

		return codigo.replace(/\s\+/g,' ');
	}
}
