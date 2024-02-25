import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';  // importing service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lang:string|null='en'
  title = 'task';
  isLogged!: any;
  constructor(private translate: TranslateService , private router: Router) {
    
    this.isLogged = localStorage.getItem('isLogged');
    this.lang = localStorage.getItem('lang');
    if (this.lang==="en" || this.lang==null) {
      this.translate.use('en');
      document.getElementsByTagName('body')[0].classList.add("rtl","ltr")

      
    } else {
      this.translate.use('ar');
      document.getElementsByTagName('body')[0].classList.replace("ltr","rtl")

      
    }

    // if (!this.isLogged) {
    //   this.router.navigateByUrl('/login');
    // }
    
 
  }
  OnInit(){
    
  }
 
   
}
