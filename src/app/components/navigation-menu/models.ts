import { Distribuidor, Producto_Detalle, Requisicion} from './RestModels';

export interface StringDictionary<T> {
	[key: string]: T;
}
export interface NumberDictionary<T> {
	[key: number]: T;
}

export interface DetalleInventario {
	id_flor: number;
	id_color: number;
	tallos_requeridos?: number;
	tallos_apartados?: number;
	tallos_en_almacen?: number;
}

export interface FloresRequeridas {
	id_flor: string,
	id_color: string,
	grado: string,
	cantidad_de_tallos: number;
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

