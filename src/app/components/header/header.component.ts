import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  orden:boolean = false;
  show_logout: boolean = false;
  @Input() show:boolean;
  ngOnInit() {
  }
  showLogoutModal() {
    this.show_logout=true;
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    this.show_logout=false
    // localStorage.removeItem('usuario');
    // localStorage.removeItem('session_token');
    // localStorage.removeItem('id_organizacion');
    this.rest.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
