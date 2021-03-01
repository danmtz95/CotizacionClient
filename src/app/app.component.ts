import { Component, OnInit } from '@angular/core';
import { Usuario } from './models/RestModels';
import { RestService } from './services/rest.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {
    title = 'CotizacionManager';
    usuario: Usuario;
    menu=false;
    constructor(public rest: RestService) { }
    ngOnInit() {
        this.usuario = this.rest.getUsuarioSesion();

    }




    //  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    // $("body").toggleClass("sidebar-toggled");
    // $(".sidebar").toggleClass("toggled");
    // if ($(".sidebar").hasClass("toggled")) {
    //   $('.sidebar .collapse').collapse('hide');
    // };
}

