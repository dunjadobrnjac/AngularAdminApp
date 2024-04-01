import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DevicesService } from '../services/devices.service';
import { ThemePalette } from '@angular/material/core';

export interface Device {
  position: number;
  serial_number: string;
  username: string;
  status: string;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: Device[] = [];
  requests: Device[] = [];

  constructor(private deviceService: DevicesService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("userToken");
    if (token) {
      this.deviceService.getAllDevices(token).subscribe(
        response => {
          console.log(response);
          this.devices = response;
          this.devices.forEach((device: Device, index: number) => {
            device.position = index + 1;
          })
        },
        error => {

        }
      );
      this.deviceService.getRequests(token).subscribe(
        response => {
          console.log(response);
          this.requests = response;
          this.requests.forEach((device: Device, index: number) => {
            device.position = index + 1;
          })
        },
        error => {

        }
      );
    }
  }
  displayedColumns: string[] = ['position', 'serial_number', 'username', 'status'];
  displayedColumnsRequest: string[] = ['position', 'serial_number', 'username', 'status', 'approval', 'delete'];
}
