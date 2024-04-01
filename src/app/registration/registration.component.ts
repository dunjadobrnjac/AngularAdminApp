import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username!: string;
  password!: string;

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, /*Validators.minLength(8)*/]],
    })
  }

  register() {
    if (this.registrationForm.valid) {
      console.log("Registracija", this.registrationForm.value);
      this.registrationService.userRegistration(this.username, this.password).subscribe(
        response => {
          console.log(response);
          if (response.username) {
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.log(error.error.code)
          console.log(error.error.message)
          if (error.error.code == 409) {
            this.snackbar.open(error.error.message, "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            )
          } else {
            this.snackbar.open("Oops! Something went wrong. Please try again later.", "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar']
              }
            )
          }
        }
      );

    } else {
      console.log("Forma nije ispravna!");
    }
  }
}
