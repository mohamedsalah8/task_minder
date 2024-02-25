import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionServiceService } from 'src/app/services/api-function-service.service';
import { TranslateService } from '@ngx-translate/core';  // importing service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogged!: any;
  userId!: any;
  userImg!: string;
  signOut() {
    localStorage.removeItem('isLogged');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
  constructor(private translate: TranslateService, private router: Router, private api: ApiFunctionServiceService) {

    this.isLogged = localStorage.getItem('isLogged');
    if (this.isLogged) {
      this.userId = localStorage.getItem('user_id');
      this.api
        .getById('http://localhost:3000/users', this.userId)
        .subscribe((data: any) => {
          this.userImg = data.img;
        });

    }

  }
  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    if (lang === 'ar') {
      document.getElementsByTagName('body')[0].classList.replace("ltr","rtl")
    } else if (lang === 'en') {
      document.getElementsByTagName('body')[0].classList.add("rtl","ltr")

    }
    // Change the active language
  }
  // currentLanguage: string = 'en';


}
