import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeLink: string = "/registration"
  constructor(private router: Router) { }
  ngOnInit(): void {

  }

  isLoginRoute(): boolean {
    this.activeLink = '/registration';
    return this.router.url === '/login';
  }

  isRegistrationRoute(): boolean {
    this.activeLink = '/login';
    return this.router.url === '/registration';
  }

  isDevicesRoute(): boolean {
    this.activeLink = '/logout';
    return this.router.url === '/devices';
  }

}
