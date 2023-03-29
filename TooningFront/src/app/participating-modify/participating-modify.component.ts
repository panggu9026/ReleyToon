import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-participating-modify',
  templateUrl: './participating-modify.component.html',
  styleUrls: ['./participating-modify.component.css']
})
export class ParticipatingModifyComponent {
  url: string
  img: string
  base64code!: any
  boardId : any
  title : string
  writer : string
  date : any
  //modify_img: string
  content : string
  //url = "http://localhost:5000/board_modify/1";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  onChange = ($event: Event) =>  {
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

  //취소버튼 : 참가자 목록 페이지로 이동
  goToParticipantPage(){
    var cancel_alert = confirm('지금 취소하시면 지금까지의 내용은 저장되지 않습니다. \n정말 취소하시겠습니까?')
    if(cancel_alert == true) {
      this.router.navigate(['/participating-works'])
    }
  }

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('item')
    this.url = 'http://localhost:5000/board_modify/' + this.boardId
    console.log(this.boardId)
    this.http.get<any>('http://localhost:5000/board_detail/' + this.boardId).subscribe(data => {
      console.log(data[0])
      this.title = data[0].rp_title;
      this.writer = data[0].rp_part_id;
      this.date = data[0].rp_date;
      this.img = data[0].rp_img;
      this.content = data[0].rp_content;
    });
  }

  ngOnDestroy() {
    console.log("participating-works page end")
  }
}
