import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ITempletsList {
  idx: Number;
  img: String;
  title: String;
}

let templetsList: ITempletsList[];
templetsList = [];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  postId: any;

  constructor(private router: Router, private http: HttpClient) { }

  participatingWorks() {
    this.router.navigate(['/participating-works']);
  }

  participating() {
    this.router.navigate(['/participating']);
  }

  templetsList: {
    idx: Number;
    img: String;
    title: String;
  }[] | undefined;

  ngOnInit() {
    this.http.get<any>('http://localhost:5000/templets').subscribe(data => {
      console.log(data)

      for (let i = 0; i < data.length; i++) {
        templetsList.push({
          idx: data[i].rt_id,
          img: data[i].src,
          title: data[i].rt_title,
        });
      }
    });
    this.templetsList = templetsList;
  }

  ngOnDestroy() {
    templetsList = [];
  }

  scroll() {
    return 'box active'
  }
}
