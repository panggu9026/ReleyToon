import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


interface ICommentList {
  idx: Number;
  writer: String;
  date: String;
  content: String;
  commentPasswd: String;
  reply: boolean;
}

let commentList: ICommentList[];
commentList = [];

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  commentPasswd: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  commentList: {
    idx: Number;
    writer: String;
    date: String;
    content: String;
    commentPasswd: String;
    reply: boolean;
  }[] | undefined;

  boardId: any
  comment_insert_url: string

  //삭제하기 버튼
  delete_url: string

  // commentDeleteAlert() {
  //   //this.delete_url = 'http://localhost:5000/comment_delete/' + this.boardId
  //   var delete_alert = confirm('해당 댓글을 삭제하시겠습니까?')
  //   if (delete_alert == true) {
  //     var passwd = prompt('댓글의 비밀번호를 입력하세요')
  //     if (passwd == this.commentPasswd) {
  //       this.delete_url = 'http://localhost:5000/comment_delete/' + this.boardId
  //       alert('삭제되었습니다.')
  //     } else {
  //       console.log(this.commentPasswd)
  //       console.log(this.delete_url)
  //       alert('비밀번호가 일치하지 않습니다.')
  //     }
  //   }
  // }

  //댓글 수 카운트
  commentCount: any
  
  //답글 토글
  //showMyContainer: boolean = false;
  replyClick(item: ICommentList) {
    item.reply = !item.reply
  }

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('item')
    this.comment_insert_url = "http://localhost:5000/comment_insert/" + this.boardId
    //console.log(this.boardId)
    //console.log(this.comment_insert_url)

    this.delete_url = 'http://localhost:5000/comment_delete/' + this.boardId

    this.http.get<any>('http://localhost:5000/comment_list_count/' + this.boardId).subscribe(data => {
      this.commentCount = data[0].count
    });

    this.http.get<any>('http://localhost:5000/comment_list/' + this.boardId).subscribe(data => {
      console.log(data)

      for (let i = 0; i < data.length; i++) {
        commentList.push({
          idx: data[i].comment_id,
          writer: data[i].comment_nickname,
          date: data[i].comment_date,
          content: data[i].comment_content,
          commentPasswd: data[i].comment_pwd,
          reply: false //답글 토글 T/F 판단
        });
      }
    });
    this.commentList = commentList;
  }

  ngOnDestroy() {
    commentList = [];
  }
}
