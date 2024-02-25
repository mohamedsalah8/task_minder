import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionServiceService } from 'src/app/services/api-function-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isLogged!: any;
  userData!: any;
  userId!: any;
  constructor(private api: ApiFunctionServiceService, private router: Router) {
    this.isLogged = localStorage.getItem('isLogged');
    if (!this.isLogged) {
      this.router.navigateByUrl('/login');
    }
    this.userId = localStorage.getItem('user_id');
    this.api
      .getById('http://localhost:3000/users', this.userId)
      .subscribe((data: any) => {
        this.userData = data;
      });
  }
}
