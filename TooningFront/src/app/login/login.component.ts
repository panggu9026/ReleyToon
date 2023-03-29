import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router
  ) { }


email:string;
password:string;

saveData() {
  sessionStorage.setItem('email', this.email);
  sessionStorage.setItem('password', this.password);
  this.router.navigate(['/main'])
}

}
