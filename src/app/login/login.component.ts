import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiFunctionServiceService } from '../services/api-function-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  message: string = '';
  isLogged!: any;
  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private api: ApiFunctionServiceService, private router: Router) {
    // this.isLogged = localStorage.getItem('isLogged');
    // if (this.isLogged) {
    //   this.router.navigateByUrl('/tasks');
    // }
  }
  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }

  submit() {
    if (this.login.valid) {
      this.api.get('http://localhost:3000/users').subscribe((res: any) => {
        let user = res.find((data: any) => {
          localStorage.setItem('user_id', data.id);
          return (
            data.email == this.email?.value &&
            data.password == this.password?.value
          );
        });
        if (user) {
          localStorage.setItem('isLogged', 'true');
          this.router.navigateByUrl('/tasks').then(() => {
            window.location.reload();
          });
        } else {
          this.message = 'Email or password is incorrect please try again';
          setTimeout(() => {
            this.message = '';
          }, 5000);
        }
      });
    }
  }
}
