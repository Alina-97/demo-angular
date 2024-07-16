import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.http.post<any>('http://localhost:8085/api/v1/employee/login', this.loginForm.value)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          if (resultData.message === 'Email not exists') {
            alert('Email not exists');
          } else if (resultData.message === 'Login Success') {
            this.router.navigateByUrl('/home');
          } else {
            alert('Incorrect Email and Password do not match');
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error occurred:', error);
          alert('Failed to login');
          this.loading = false;
        }
      );
  }
}
