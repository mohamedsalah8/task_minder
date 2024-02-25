import { Component } from '@angular/core';
import { ApiFunctionServiceService } from '../services/api-function-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  create = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  constructor(private api: ApiFunctionServiceService, private router: Router) {}
  get email() {
    return this.create.get('email');
  }
  get password() {
    return this.create.get('password');
  }
  get name() {
    return this.create.get('name');
  }
  get img() {
    return this.create.get('img');
  }
  addUser() {
    this.api
      .post('http://localhost:3000/users', this.create.value)
      .subscribe((data: any) => {
        this.router.navigateByUrl('/login');
      });
  }
}
