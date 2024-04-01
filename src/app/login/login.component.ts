import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log("Login Form ", this.loginForm.value);
      this.loginService.userLogin(this.username, this.password).subscribe(
        response => {
          console.log(response);
          if (response.access_token) {
            localStorage.setItem("userToken", response.access_token)
            this.router.navigate(['/devices'])
          }

        },
        error => {
          console.log(error.status)
          if (error.status == 404 || error.status == 401) {
            this.snackbar.open(error.error.message, "",
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar']
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
    }
  }

}
