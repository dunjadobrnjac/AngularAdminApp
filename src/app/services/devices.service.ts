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

  public updateStatus(token: string, device_id: number, newStatus: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    const payload = {
      device_id: device_id,
      status: newStatus
    };
    const url = `${this.baseUrl}/auth/update`;
    return this.httpClient.patch<any>(url, payload, { headers: headers });
  }
}
