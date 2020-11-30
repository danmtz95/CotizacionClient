import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Observable, BehaviorSubject,forkJoin } from 'rxjs';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

	@Input() show:boolean = false;
	@Input() closable:boolean = true;
	@Output() showChange= new EventEmitter<boolean>();

	constructor(private rest:RestService) {

	}

	ngOnInit() {

		this.rest.keyUpObserver.subscribe((e)=>
		{
			if( e.keyCode == 27 )
			{
				if( this.closable )
				{
					this.showChange.emit( false );
				}
			}
		});
	}
}
