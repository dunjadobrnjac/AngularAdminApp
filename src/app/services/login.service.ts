import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://127.0.0.1:5000/user';

  public userLogin(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'username': username,
      'password': password
    });
    const url = `${this.baseUrl}/login`;
    return this.httpClient.get(url, { headers: headers });
  }

  public userLogout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    const url = `${this.baseUrl}/logout`;
    return this.httpClient.get(url, { headers: headers })
  }
}
