import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerText: string = 'Registration';
  headerLink: string = '/registration';

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setHeaderTextAndLink(event.url);
    });
  }

  setHeaderTextAndLink(url: string) {
    if (url === '/login') {
      this.headerText = "Registration";
      this.headerLink = "/registration";
    } else if (url === '/registration') {
      this.headerText = "Login";
      this.headerLink = "/login";
    } else if (url === '/devices') {
      this.headerText = "Logout";
      this.headerLink = "/login";
    }
  }

  headerClick() {
    // Ovdje možete dodati logiku za preusmjeravanje na odgovarajuću stranicu
    if (this.headerText == 'Logout') {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.loginService.userLogout(token).subscribe(
          response => {
            console.log(response);
            localStorage.removeItem('userToken');
          }
        );
      }
    }
    this.router.navigateByUrl(this.headerLink);
  }
}