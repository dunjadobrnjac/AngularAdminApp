import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DevicesService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://127.0.0.1:5000';

  public getAllDevices(token: string): Observable<any> {
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    const url = `${this.baseUrl}/devices/all`;
    return this.httpClient.get(url, { headers: headers });
  }

  public getRequests(token: string): Observable<any> {
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    const url = `${this.baseUrl}/devices/requests`;
    return this.httpClient.get(url, { headers: headers });
  }
}
