import { Component, OnInit } from '@angular/core';
import { Usuario } from './models/RestModels';
import { RestService } from './services/rest.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'CotizacionManager';
    usuario: Usuario;
    menu=false;
    constructor(public rest: RestService) { }
    ngOnInit() {
        this.usuario = this.rest.getUsuarioSesion();

    }
    openNav() {

        if (this.menu == false) {
            document.getElementById("accordionSidebar").style.position = "absolute";
            document.getElementById("accordionSidebar").style.zIndex = "-1";
            this.menu =true;
        }else{
            document.getElementById("accordionSidebar").style.position = "relative";
            document.getElementById("accordionSidebar").style.zIndex = "1";
            this.menu =false;
        }



        // document.getElementById("sidebarToggleTop").style.marginLeft = "250px";
    }



    //  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    // $("body").toggleClass("sidebar-toggled");
    // $(".sidebar").toggleClass("toggled");
    // if ($(".sidebar").hasClass("toggled")) {
    //   $('.sidebar .collapse').collapse('hide');
    // };
}

