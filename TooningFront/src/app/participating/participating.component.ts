import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

interface ITempletsList {
  idx: Number;
  img: String;
  title: String;
}

let templetsList: ITempletsList[];
templetsList = [];

@Component({
  selector: 'app-participating',
  templateUrl: './participating.component.html',
  styleUrls: ['./participating.component.css']
})
export class ParticipatingComponent {

  //게시물 업로드 위한 백서버 주소
  url = "http://localhost:5000/board_insert";
  img: string;
  base64code!: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);

    this.convertToBase64(file);
  };

  //이미지 base64로 인코딩
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d);
      this.img = d;
      this.base64code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);

      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  //취소버튼 : 메인페이지로 이동
  goToMain() {
    var cancel_alert = confirm('지금 취소하시면 지금까지의 내용은 저장되지 않습니다. \n정말 취소하시겠습니까?')
    if (cancel_alert == true) {
      this.router.navigate(['/main'])
    }
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
    console.log("participating-works page end")
  }
}
