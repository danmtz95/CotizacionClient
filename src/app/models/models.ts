import { Caja, Asistencia_Personal, Distribuidor, Color, Recibo_Inventario } from './RestModels';
import { Equivalencia, Flor, Inventario, Inventario_Material } from './RestModels';
import { Material, Orden, Orden_Detalle, Orden_Personal } from './RestModels';
import { Producto, Producto_Detalle, Producto_Material, Pedido, Pedido_Detalle, Personal } from './RestModels';
import { Ramo, Ramo_Detalle, Reemplazo_Flor, Transfer, Transfer_Detalle, Transfer_Inventario } from './RestModels';
import { Requisicion, Requisicion_Flor, Requisicion_Material } from './RestModels';
import { Tarima, Tarima_Caja } from './RestModels';
import { Envio, Envio_Tarima, Orden_Detalle_Personal } from './RestModels';

export interface StringDictionary<T> {
	[key: string]: T;
}
export interface NumberDictionary<T> {
	[key: number]: T;
}

export interface RamoDetalleInfo {
	ramo_detalle?: Ramo_Detalle;
	flor?: Flor;
	color?: Color;
}

export interface MaterialInfo {
	producto_material?: Producto_Material;
	material?: Material;
}

export interface TransferFloresRequeridas {
	reemplazo_flor?: Reemplazo_Flor;
	ramo_detalle?: Ramo_Detalle;
	transfer_detalle?: Transfer_Detalle;
	flores_requeridas?: FloresRequeridas;
}

export interface OrdenDetalleInfo {
	orden_detalle?: Orden_Detalle;
	distribuidor?: Distribuidor;
	producto?: Producto;
	materiales?: MaterialInfo[];
	equivalencia?: Equivalencia;
	producto_detalles?: ProductoDetalleInfo[];
	//orden_detalle_produccion_cajas?: Orden_Detalle_Produccion_Cajas[];
	tipo_diferencia?: string;
	diferencia_cajas?: number;
	orden?: Orden;
	reemplazos?: Reemplazo_Flor[];
	transfers?: TransferInfo[];
	orden_detalle_personal?: Orden_Detalle_Personal[];
	cajas?: Caja[];
	inicio_produccion?: Date;
	fin_produccion?: Date;
}

export interface OrdenPersonalInfo {
	orden_personal?: Orden_Personal;
	personal?: Personal;
};

export interface OrdenInfo {
	orden?: Orden;
	distribuidor?: Distribuidor;
	orden_detalles?: OrdenDetalleInfo[];
	orden_personal_info?: OrdenPersonalInfo[];
	diferencia_dias?: number;
	cantidad_de_horas?: number;
	cantidad_de_cajas?: number;
	cantidad_de_tallos?: number;
	cantidad_de_ramos?: number;
	tipo_modificacion?: string;
}

export interface ProductoDetalleInfo {
	producto_detalle?: Producto_Detalle;
	ramo?: Ramo;
	ramo_detalles?: RamoDetalleInfo[];
}

export interface ProductoMaterialInfo {
	material?: Material;
	producto_material?: Producto_Material;
}
export interface ProductoInfo {
	producto?: Producto;
	detalles?: ProductoDetalleInfo[];
	materiales?: ProductoMaterialInfo[];
}
export interface RamoInfo {
	ramo?: Ramo;
	ramo_detalles?: RamoDetalleInfo[];
}

export interface EquivalenciaInfo {
	distribuidor?: Distribuidor;
	equivalencia?: Equivalencia;
}

export interface ProductoEquivalenciaInfo {
	producto?: Producto;
	equivalencias?: EquivalenciaInfo[];
}

export interface DetalleInventario {
	id_flor: number;
	id_color: number;
	tallos_requeridos?: number;
	tallos_apartados?: number;
	tallos_en_almacen?: number;
}

export interface OrdenInventarioInfo {
	orden?: Orden;
	distribuidor?: Distribuidor;
	detalle_inventario?: DetalleInventario[];
}

export interface PedidoDetalleInfo {
	producto?: Producto;
	pedido_detalle?: Pedido_Detalle;
}

export interface FloresRequeridas {
	id_flor: string,
	id_color: string,
	grado: string,
	cantidad_de_tallos: number;
}

export interface PedidoInfo {
	pedido?: Pedido;
	detalles?: PedidoDetalleInfo[];
}

export interface InventarioInfo {
	inventario?: Inventario;
	flor?: Flor;
	color?: Color;
}

export interface PersonalAsistenciaInfo {
	personal?: Personal;
	asistencia_personal?: Asistencia_Personal;
}

export interface TransferInventarioInfo {
	inventario?: Inventario;
	transfer_inventario?: Transfer_Inventario;
}
export interface TransferDetalleInfo {
	transfer_detalle?: Transfer_Detalle;
	transfer_inventarios?: TransferInventarioInfo[];
}

export interface TransferInfo {
	transfer?: Transfer,
	detalles?: Transfer_Detalle[]
	detalles_info?: TransferDetalleInfo[];
}

export interface RequisicionFlorInfo {
	requisicion_flor?: Requisicion_Flor;
	flor?: Flor;
	color?: Color;
}

export interface RequisicionMaterialInfo {
	requisicion_material?: Requisicion_Material;
	material?: Material;
}

export interface RequisicionInfo {
	requisicion?: Requisicion;
	detalles_flor?: RequisicionFlorInfo[];
	detalles_material?: RequisicionMaterialInfo[];
}

export interface CajaInfo {
	caja?: Caja;
	tarima_caja?: Tarima_Caja;
	orden_detalle?: Orden_Detalle;
	producto?: Producto;
	orden?: Orden;
}

export interface TarimaCajaInfo extends CajaInfo {

}
export interface TarimaInfo {
	tarima?: Tarima;
	detalles?: TarimaCajaInfo[];
}

export interface EnvioTarimaInfo {
	tarima?: Tarima;
	envio_tarima?: Envio_Tarima;
}

export interface EnvioInfo {
	envio?: Envio;
	detalles?: EnvioTarimaInfo[];
}

export interface OrdenDetalleInicioDuracionProduccion {
	orden_detalle?: OrdenDetalleInfo;
	inicio?: Date;
	fin?: Date;
}

export interface GraphData {
	view?: number[]; //The dimensions of the graphic set undefined for fill container
	results?: any[]; //The chart data
	schemeType?: string; //'ordinal' or 'linear'
	scheme?: any; //ColorScheme
	roundEdges?: boolean; //Rounded edges
	legendPosition?: string;
	xAxis?: any;
	yAxis?: any;
	legend?: boolean;
	labels?: boolean; //Show o hide the labels;
	gradient?: boolean;
	showXAxisLabel?: boolean;
	xAxisLabel?: string;
	yAxisLabel?: string;
	showYAxisLabel?: boolean;
	doughnut?: boolean;
	select?: any;
	activate?: any;
	deactivate?: any;
}

export interface ReciboInventarioInfo {
	recibo_inventario?: Recibo_Inventario;
	inventarios?: Inventario[];
}


