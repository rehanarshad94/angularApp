import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /**
   * renders navbar
   * @param router 
   */
  constructor(public router: Router) {}

  
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}