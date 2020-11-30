import { Directive, ElementRef, Input } from '@angular/core';
import { RestService } from '../services/rest.service';

@Directive({
  selector: '[appAccess]'
})
export class AccessDirective {

  @Input('appAccess') access;

  constructor(private el: ElementRef, private restService: RestService) {
  }

  ngOnInit( ){
    this.restService.currentUser.subscribe(user => {
      if(user){
        const rol = user.usuario.tipo.toLowerCase();
        const isAuthorized = this.access.find( authorizedRol => authorizedRol.toLowerCase() === rol)
        if(!isAuthorized){
          this.el.nativeElement.style.display = 'none' 
        }
      }
    });
  }

}
