import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  isTokenValid(): boolean {
    const token = localStorage.getItem('userToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log("jwt " + this.jwtHelper.isTokenExpired(token))
      return true;
    }
    return false;
  }
}
