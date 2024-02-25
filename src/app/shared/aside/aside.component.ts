import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  constructor(protected router: Router) {}
  signOut() {
    localStorage.removeItem('isLogged');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}
