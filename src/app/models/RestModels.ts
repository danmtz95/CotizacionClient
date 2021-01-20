/*GENERATED AUTOMATICALLY PLEASE DO NOT EDIT */

export interface Archivo_Cargado{
	id?:number;
	fecha_inicio?:string;
	fecha_final?:string;
	suma?:string;
	nombre?:string;
}
export interface Asistencia_Personal{
	id?:number;
	id_personal?:number;
	fecha?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
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
export interface Caja{
	id?:number;
	id_orden_detalle?:number;
	descripcion?:string;
	peso?:number;
	numero_secuencial?:number;
	estatus?:string;
	id_usuario?:number;
	id_personal?:number;
	hora_que_se_termino?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Ramo_Produccion{
	id?:number;
	id_orden_detalle?:number;
	numero_secuencial?:number;
	estatus?:string;
	id_usuario?:number;
	id_personal?:number;
	hora_que_se_termino?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Cliente{
	id?:number;
	id_distribuidor?:number;
	id_cliente_principal?:number;
	nombre?:string;
	codigo?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Color{
	id?:string;
	nombre?:string;
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
export interface Envio{
	id?:number;
	estatus?:string;
	nota?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Envio_Tarima{
	id?:number;
	id_envio?:number;
	estatus?:string;
	id_tarima?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Equivalencia{
	id?:number;
	id_producto?:number;
	numero_upc?:string;
	instrucciones_upc?:string;
	id_distribuidor?:number;
	sku_distribuidor?:string;
	precio?:number;
	instrucciones_etiquetas?:number;
	instrucciones_de_armado?:string;
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
export interface Flor{
	id?:string;
	nombre_comun?:string;
	nombre_cientifico?:string;
	sexual?:number;
	precio?:number;
	densidad_m2?:number;
	porcentaje?:number;
	cavidad?:number;
	germinacion?:number;
	tallos?:number;
	tiempo_actualizacion?:Date;
	tiempo_creacion?:Date;
}
export interface Flor_Variedad{
	id?:number;
	nombre?:string;
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
	id_usaurio?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Inventario{
	id?:number;
	id_flor?:string;
	id_color?:string;
	id_requisicion_flor?:number;
	grado?:string;
	tallos_por_ramo?:number;
	ramos_por_bote?:number;
	botes_recibidos?:number;
	tallos_recibidos?:number;
	tallos_en_existencia?:number;
	tallos_apartados_por_transfer?:number;
	fecha_recibido?:string;
}
export interface Inventario_Material{
	id?:number;
	id_material?:string;
	cantidad?:number;
	raw_info?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Inventario_Material_Movimiento{
	id?:number;
	id_requisicion_material?:number;
	id_material?:string;
	tipo_movimiento?:string;
	cantidad_anterior?:number;
	cantidad_actual?:number;
	cantidad_movimiento?:number;
	raw_info?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Material{
	id?:string;
	id_imagen?:number;
	nombre?:string;
	unidad_de_medida?:string;
	tipo_material?:string;
	descripcion?:string;
	precio?:number;
}
export interface Material_Copia{
	id?:number;
	id_imagen?:number;
	nombre?:string;
	unidad_de_medida?:string;
	tipo_material?:string;
	codigo?:string;
	descripcion?:string;
	precio?:number;
}
export interface Orden{
	id?:number;
	id_distribuidor?:number;
	id_cliente?:number;
	direccion_de_envio?:string;
	id_pedido_detalle?:number;
	estatus?:string;
	estatus_aceptacion?:string;
	tipo_orden?:string;
	tipo_de_caja?:string;
	numero_orden_distribuidor?:string;
	numero_orden_distrubuidor?:string;
	sales_rep_name?:string;
	customer_name?:string;
	customer_ship_to?:string;
	origi_carrier?:string;
	dest_carrier?:string;
	shipping_date?:string;
	load_date?:string;
	estatus_de_produccion?:string;
	fecha_estimada_de_produccion?:string;
	prioridad_de_produccion?:number;
	cantidad_de_tallos?:number;
	estatus_de_envio?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
export interface Orden_Detalle{
	id?:number;
	id_orden?:number;
	fecha_estimada_de_produccion?:string;
	id_producto?:number;
	id_producto_original?:number;
	hora_en_que_inicio_la_produccion?:Date;
	prioridad_de_produccion?:number;
	cantidad_de_cajas?:number;
	cantidad_de_ramos?:number;
	ramos_por_caja?:number;
	cantidad_de_tallos?:number;
	estatus?:string;
	estatus_de_produccion?:string;
	estatus_de_envio?:string;
	raw_data_json?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Orden_Detalle_Personal{
	id?:number;
	id_orden_detalle?:number;
	id_personal?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Orden_Detalle_Produccion_Cajas{
	id?:number;
	id_orden_detalle?:number;
	id_usuario?:number;
	cantidad_de_cajas?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Orden_Personal{
	id?:number;
	id_orden?:number;
	id_personal?:number;
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
export interface Pedido{
	id?:string;
	id_distribuidor?:number;
	fecha?:string;
	estatus?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
export interface Pedido_Detalle{
	id?:number;
	id_pedido?:string;
	id_producto?:number;
	lugar_de_entrega?:string;
	cantidad?:number;
}
export interface Personal{
	id?:number;
	id_imagen?:number;
	nombres?:string;
	apellido_paterno?:string;
	apellido_materno?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
export interface Precio_Flor{
	id?:number;
	id_flor?:string;
	id_color?:string;
	precio?:number;
}
export interface Producto{
	id?:number;
	id_imagen?:number;
	estatus?:string;
	nombre?:string;
	aparecio_por_primera_vez_en_archivo?:string;
	necesita_revision?:string;
	tipo_manga?:string;
	tipo_de_caja?:string;
	cajas_por_tarima?:number;
	codigo?:string;
	ramos_por_caja?:number;
	estructura?:string;
	ramos_por_hora?:number;
	cajas_por_hora?:number;
	costo_mano_obra?:number;
	sustitucion_de_flor?:string;
	descripcion?:string;
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
export interface Producto_Material{
	id?:number;
	id_producto?:number;
	id_material?:string;
	estatus?:string;
	tipo_multiplicador?:string;
	cantidad?:number;
}
export interface Pronostico_Corte{
	id?:string;
	cantidad_de_tallos?:number;
	id_flor?:string;
	id_color?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Proyeccion_De_Asistencia{
	id?:number;
	dia?:string;
	cantidad_de_personal?:number;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
export interface Proyeccion_De_Corte{
	id?:number;
	fecha?:string;
	id_flor?:string;
	id_color?:string;
	grado?:string;
	cantidad_de_tallos?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Ramo{
	id?:string;
	nombre?:string;
	necesita_revision?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Ramo_Detalle{
	id?:number;
	id_ramo?:string;
	id_flor?:string;
	id_color?:string;
	grado?:string;
	cantidad_de_tallos?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Recibo_Inventario{
	id?:number;
	id_usuario_receptor?:number;
	nombre_quien_entrega?:string;
	nombre_quien_recibe?:string;
	origen?:string;
	nota?:string;
	total_de_tallos_entregados?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Reemplazo_Flor{
	id?:number;
	id_orden_detalle?:number;
	id_ramo_detalle?:number;
	id_flor?:string;
	id_color?:string;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
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
export interface Requisicion_Flor{
	id?:number;
	id_requisicion?:number;
	id_flor?:string;
	id_color?:string;
	grado?:string;
	cantidad_de_tallos?:number;
	lugar_de_origen?:string;
	fecha_de_entrega?:string;
	estatus?:string;
	estatus_de_entrega?:string;
	fecha_creacion?:Date;
	fecha_actualizacion?:Date;
}
export interface Requisicion_Material{
	id?:number;
	id_requisicion?:number;
	id_material?:string;
	cantidad?:number;
	id_proveedor?:number;
	cantidad_recibida?:number;
	fecha_de_entrega?:string;
	estatus?:string;
	estatus_de_entrega?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
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
	nombre?:string;
	telefono?:string;
	rfc?:string;
	ciudad?:string;
	estado?:string;
	codigo_postal?:number;
	direccion?:string;
	id_imagen?:number;
	id_imagen_ticket?:number;
	saludo_ticket?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
	iva?:number;
	tipo_cambio_dolares?:number;
}
export interface Tarima{
	id?:number;
	id_usuario?:number;
	codigo?:string;
	descripcion?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Tarima_Caja{
	id?:number;
	id_tarima?:number;
	id_caja?:number;
	id_usuario?:number;
	estatus?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Transfer{
	id?:number;
	id_orden_detalle?:number;
	estatus_de_almacen?:string;
	fecha_estimada_de_produccion?:string;
	load_date?:string;
	customer_name?:string;
	cantidad_de_cajas?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Transfer_Detalle{
	id?:number;
	id_transfer?:number;
	id_flor?:string;
	id_color?:string;
	cantidad_de_tallos?:number;
	estatus_de_entrega?:string;
}
export interface Transfer_Inventario{
	id?:number;
	id_transfer_detalle?:number;
	id_inventario?:number;
	cantidad_de_tallos?:number;
	cantidad_de_botes?:number;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}
export interface Usuario{
	id?:number;
	usuario?:string;
	contrasena?:string;
	tipo?:string;
	correo_electronico?:string;
	telefono?:string;
	nombre?:string;
	apellido_paterno?:string;
	apellido_materno?:string;
	tipo_de_usuario?:string;
	tiempo_creacion?:Date;
	tiempo_actualizacion?:Date;
}

