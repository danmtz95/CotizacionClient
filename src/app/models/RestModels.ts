/*GENERATED AUTOMATICALLY PLEASE DO NOT EDIT */

export interface Attachment{
	id?:number;
	uploader_user_id?:number;
	file_type_id?:number;
	filename?:string;
	original_filename?:string;
	content_type?:string;
	size?:number;
	width?:number;
	height?:number;
	status?:string;
	created?:Date;
	updated?:Date;
}

export interface Bitacora{
	id?:number;
	titulo?:string;
	descripcion?:string;
	fecha?:Date;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Cliente{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	id_imagen?:number;
	nombre?:string;
	codigo?:string;
	correo_electronico?:string;
	telefono?:string;
	direccion?:string;
	ciudad?:string;
	codigo_postal?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Distribuidor{
	id?:number;
	nombre?:string;
	id_imagen?:number;
	telefono?:string;
	direccion?:string;
	ciudad?:string;
	estado?:string;
	codigo_postal?:string;
	correo_electronico?:string;
	tiempo_actualizacion?:Date;
	tiempo_creacion?:Date;
}

export interface Distribuidor_Direccion{
	id?:number;
	id_distribuidor?:number;
	direccion?:string;
}

export interface File_Type{
	id?:number;
	organization_id?:number;
	name?:string;
	content_type?:string;
	extension?:string;
	is_image?:string;
	image_id?:number;
	created?:Date;
	updated?:Date;
}

export interface Imagen{
	id?:number;
	uploader_user_id?:number;
	es_privada?:number;
	filename?:string;
	original_filename?:string;
	content_type?:string;
	size?:number;
	width?:number;
	height?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Imagen_Usuario{
	id?:number;
	id_imagen?:number;
	id_usuario?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Organizacion{
	id?:number;
	id_imagen_default_ticket?:number;
	id_imagen_default_login?:number;
	id_imagen_default_logo?:number;
	id_imagen_default_proveedor?:number;
	id_imagen_default_servicio?:number;
	id_imagen_default_usuario?:number;
	id_imagen_default_sucursal?:number;
	nombre?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Servicio{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	id_proveedor?:number;
	id_unidad_de_medida?:number;
	id_categoria?:number;
	id_imagen?:number;
	url_imagen?:string;
	codigo?:string;
	codigo_sat?:string;
	costo?:number;
	iva?:number;
	precio_especial?:number;
	precio_venta?:number;
	tipo?:string;
	nombre?:string;
	marca?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}

export interface Servicio_Recurso{
	id?:number;
	id_servicio_primario?:number;
	id_servicio_secundario?:number;
	cantidad?:number;
	estatus?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}

export interface Producto_Detalle{
	id?:number;
	id_producto?:number;
	id_ramo?:string;
	cantidad_de_ramos?:number;
	estatus?:string;
	cantidad_de_tallos?:number;
	nota?:string;
}

export interface Requisicion{
	id?:number;
	id_usuario_solicito?:number;
	id_usuario_recibio?:number;
	id_proveedor?:number;
	flete?:number;
	costo_total?:number;
	estatus?:string;
	nota?:string;
	tiempo_actualizacion?:Date;
	tiempo_creacion?:Date;
}

export interface Sesion{
	id?:string;
	id_usuario?:number;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Sucursal{
	id?:number;
	id_organizacion?:number;
	id_imagen?:number;
	nombre?:string;
	telefono?:string;
	rfc?:string;
	ciudad?:string;
	estado?:string;
	codigo_postal?:number;
	direccion?:string;
	correo_electronico?:string;
	pagina_web?:string;
	saludo_ticket?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
	iva?:number;
	tipo_de_cambio?:number;
    facebook?:string;
}

export interface Usuario{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	id_imagen?:number;
	tipo_de_usuario?:string;
	usuario?:string;
	contrasena?:string;
	correo_electronico?:string;
	telefono?:string;
	nombre?:string;
	apellido_paterno?:string;
	apellido_materno?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

export interface Proveedor{
	id?:number;
	id_organizacion?:number;
	id_imagen?:number;
	nombre?:string;
	direccion?:string;
	telefono?:string;
	contacto?:string;
	rfc?:string;
	nota?:string;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Cotizacion{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	id_usuario?:number;
	id_cliente?:number;
	atencion?:string;
	vigencia?:number;
	anticipo?:number;
	tipo_de_pago?:string;
	costo?:number;
	flete?:number;
	costo_total?:number;
	iva?:number;
	costo_iva?:number;
	estado?:string;
	estado_de_compra?:string;
	fecha_de_entrega?:Date;
	nota?:string;
	fecha_actualizacion?:Date;
	fecha_creacion?:Date;
}

export interface Cotizacion_Detalle{
	id?:number;
	id_cotizacion?:number;
	id_servicio?:number;
	cantidad?:number;
	precio?:number;
	costo_total?:number;
	iva?:number;
	costo_iva?:number;
	fecha_actualizacion?:Date;
	fecha_creacion?:Date;
}

export interface Servicio_Categoria{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	nombre?:string;
	fecha_actualizacion?:Date;
	fecha_creacion?:Date;
}

export interface Unidad_De_Medida{
	id?:number;
	id_organizacion?:number;
	id_sucursal?:number;
	clave?:string;
	nombre?:string;
	fecha_actualizacion?:Date;
	fecha_creacion?:Date;
}
