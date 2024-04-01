import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
export class DevicesComponent implements OnInit, AfterViewInit {

  devices: Device[] = [];
  requests: Device[] = [];

  devicesSource = new MatTableDataSource(this.devices);
  requestsSource = new MatTableDataSource(this.requests);

  constructor(private deviceService: DevicesService,
    private snackbar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer) { }

  /*sorting */
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.devicesSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /*filtering */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.devicesSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.requestsSource.filter = filterValue.trim().toLowerCase();
  }

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
        });
        this.devicesSource.data = this.devices;
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
        });
        this.requestsSource.data = this.requests;
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
