import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFunctionServiceService } from 'src/app/services/api-function-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  isLogged!: any;
  userImg!: string;
  userId!: any;
  update = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  constructor(private api: ApiFunctionServiceService, private router: Router) {
    this.isLogged = localStorage.getItem('isLogged');
    if (!this.isLogged) {
      this.router.navigateByUrl('/login');
    }
    this.userId = localStorage.getItem('user_id');
    this.api
      .getById('http://localhost:3000/users', this.userId)
      .subscribe((data: any) => {
        this.userImg = data.img;
        this.update = new FormGroup({
          email: new FormControl(data.email),
          password: new FormControl(data.password),
          name: new FormControl(data.name),
          img: new FormControl(data.img),
        });
      });
  }
  get email() {
    return this.update.get('email');
  }
  get password() {
    return this.update.get('password');
  }
  get name() {
    return this.update.get('name');
  }
  get img() {
    return this.update.get('img');
  }
  updateProfile() {
    this.api
      .put('http://localhost:3000/users', this.userId, this.update.value)
      .subscribe((data) => {
        this.router.navigateByUrl('/profile').then(() => {
          window.location.reload();
        });
      });
  }
}
