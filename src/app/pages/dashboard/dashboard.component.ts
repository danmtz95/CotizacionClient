import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { GraphData, StringDictionary } from 'src/app/models/models';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

	reporte_ramos: StringDictionary<any>[];

	// topRamosGraph:GraphData = this.rest.getEmptyBarChart();

	// topProductosGraph:GraphData = this.rest.getEmptyBarChart();
	// masVendidos:GraphData = this.rest.getEmptyPieData();
	// topClientesGraph:GraphData	= this.rest.getEmptyBarChart();
	// topProductoresGraph:GraphData	= this.rest.getEmptyBarChart();


	ngOnInit() {
		// forkJoin({
		// ramos: this.rest.getReporteRamos(null, null),
		// productos: this.rest.getTopProductos(null, null),
		// clientes: this.rest.getTopClientes(null,null),
		// productores:this.rest.getTopProductores(null,null)
		// })
		// .subscribe((response)=>{
		// response.ramos.sort((a,b)=>a.ramos < b.ramos ? 1 : -1);
		// let filter:StringDictionary<any>[] = response.ramos.filter((i,index)=>index<10);

		// this.topRamosGraph.results = filter.map(i=>{
		//     return {
		//         name: i.id_ramo, value: i.ramos
		//     }
		// });

		// this.topProductosGraph.results = response.productos.filter((i,index)=>index<5).map(i=>{
		//     return { name: i.nombre,value:i.cantidad }
		// });

		// this.topClientesGraph.results = response.clientes.filter((i,index)=>index<10).map(i=>{
		// 	return { name: i.nombre, value: i.cantidad};
		// });
		// this.topProductoresGraph.results = response.productores.filter((i,index)=>index<10).map(i=>{
		// 	return { name: i.nombre, value: i.cantidad};
		// });

		//            this.reporte_ramos = filter;
		//            console.log('reporte ramos', response)
		//        },(error)=>this.showError(error));
	}
}
