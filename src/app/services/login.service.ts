import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://127.0.0.1:5000/user/login';

  public userLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'username': username,
      'password': password
    });
    return this.httpClient.get(this.url, { headers: headers });
  }
}
