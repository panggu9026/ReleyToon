import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router
  ) { 
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
  }

    email:String | null ;

  ngOninit(){
    
    
  }

  goToMain() {
    this.router.navigate(['/main'])
    
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  userlogout(){
    sessionStorage.clear();
    this.email = sessionStorage.getItem('email');
  }
}
