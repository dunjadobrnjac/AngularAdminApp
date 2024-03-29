import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DevicesService } from '../services/devices.service';

export interface Device {
  position: number;
  serial_number: string;
  username: string;
  status: string;
}

let devices: Device[] = [];

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  constructor(private deviceService: DevicesService) { }
  ngOnInit(): void {
    const token = localStorage.getItem("userToken");
    if (token) {
      this.deviceService.getAllDevices(token).subscribe(
        response => {
          console.log(response);
          devices = response;
          devices.forEach((device: Device, index: number) => {
            device.position = index + 1;
          })
        },
        error => {

        }
      );
    }
  }
  displayedColumns: string[] = ['position', 'serial_number', 'username', 'status'];
  dataSource = devices;
}
