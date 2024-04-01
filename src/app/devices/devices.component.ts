import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Device {
  position: number;
  id: number;
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

  constructor(private deviceService: DevicesService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    const token = localStorage.getItem("userToken");
    if (token) {
      this.loadDevices(token);
    }
  }
  displayedColumns: string[] = ['position', 'serial_number', 'username', 'status'];
  displayedColumnsRequest: string[] = ['position', 'serial_number', 'username', 'status', 'approval', 'delete'];

  public loadDevices(token: string) {
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

  public updateDevice(device_id: number, status: string) {
    console.log(device_id);
    const token = localStorage.getItem("userToken");
    if (token) {
      this.deviceService.updateStatus(token, device_id, status).subscribe(
        response => {
          console.log(response);
          if (response.serial_number) {
            this.loadDevices(token);
          }
        },
        error => {
          console.log(error);
          this.snackbar.open("Oops! Something went wrong. Please try again later.", "",
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar']
            }
          )
        }
      );
    }
  }
}
