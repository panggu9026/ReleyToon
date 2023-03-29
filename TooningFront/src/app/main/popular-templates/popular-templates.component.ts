import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Itemplates {
  src: String;
  url: String;
}

let templates: Itemplates[];
templates = [];


@Component({
  selector: 'app-popular-templates',
  templateUrl: './popular-templates.component.html',
  styleUrls: ['./popular-templates.component.css'],
})
export class PopularTemplatesComponent {
  list: { src: any; url: any }[] | undefined;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('http://localhost:5000/test').subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        
        templates.push({ src: data[i].src, url: data[i].url });
      }
    });
    this.list = templates;
  }
  ngOnDestroy(){
    templates = [];
  }
}
