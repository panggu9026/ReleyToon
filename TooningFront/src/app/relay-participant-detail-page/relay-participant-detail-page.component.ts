import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relay-participant-detail-page',
  templateUrl: './relay-participant-detail-page.component.html',
  styleUrls: ['./relay-participant-detail-page.component.css']
})
export class RelayParticipantDetailPageComponent {
  postId: any;
  boardPasswd : any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  //수정하기 버튼
  modifyAlert(){
    var modify_alert = confirm('수정하시겠습니까?')
    if(modify_alert == true) {
      var passwd = prompt('게시물의 비밀번호를 입력하세요')
      if(passwd == this.boardPasswd){
        this.router.navigate(['/participating-modify', { item: this.boardId }])
      }else{
        alert('비밀번호가 일치하지 않습니다.')
      }
    }
  }

  //참가작으로 버튼
  goToParticipatingWorks() {
    this.router.navigate(['/participating-works'])
  }

  //삭제하기 버튼
  delete_url : string

  deleteAlert() {
    var delete_alert = confirm('정말 삭제하시겠습니까?')
    if(delete_alert == true) {
      var passwd = prompt('게시물의 비밀번호를 입력하세요')
      if(passwd == this.boardPasswd){
        this.delete_url = 'http://localhost:5000/board_delete/' + this.boardId
        alert('삭제되었습니다.')
      }else{
        alert('비밀번호가 일치하지 않습니다.')
      }
    }
  }

  boardId: any
  title: string
  writer: string
  date: any
  img: any
  content: string
  looks: any
  rt_img:any

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('item')
    console.log(this.boardId)
    this.http.get<any>('http://localhost:5000/board_detail/' + this.boardId).subscribe(data => {
      console.log(data)
      this.title = data[0].rp_title;
      this.writer = data[0].rp_part_id;
      this.date = data[0].rp_date;
      this.img = data[0].rp_img;
      this.content = data[0].rp_content;
      this.boardPasswd = data[0].rp_passwd;
      this.looks = data[0].rp_looks;
      this.rt_img = data[0].rt_img;
    });
  }

  ngOnDestroy() {
    console.log("participating-works page end")
  }  
}
