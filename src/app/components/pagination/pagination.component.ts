import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RestService } from '../../services/rest.service';

import { Router,ActivatedRoute} from "@angular/router"
import { Location } from	'@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


	@Input() path:string = null;
	@Input() totalPages:number;
	@Input() currentPage:number;
	@Input() pages:number[];
	@Output() selectedPage = new EventEmitter<number>();

	/*
	<app-paginacion [path]="'/tipo-precio'"  [totalPages]="totalPages" [currentPage]="currentPage"></app-paginacion>
	*/

	constructor( public rest:RestService, public router:Router, public route:ActivatedRoute, public location: Location)
	{

	}

	ngOnInit() {
		this.route.queryParams.subscribe((queryParams)=>
		{
		//	console.log("new foo");
		});
	}

	gotoPage(page:number)
	{
		//console.log("Go to page ",page);
		if( this.path == null )
		{
		//	console.log('Emitting');
			this.selectedPage.emit( page );
		}
		else
		{
		//	console.log('navigate');
			let params = { page: page }
			this.router.navigate([this.path],{queryParams: params,  queryParamsHandling:"merge"});
		}
		//[routerLink]="[path]" [queryParams]="{pagina:totalPages-1}" queryParamsHandling="merge"
	}
}
