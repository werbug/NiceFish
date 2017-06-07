import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CommentService } from '../services/comment.service';
import { Comment } from '../model/comment-model';
import { UserLoginService } from '../../user/user-login/user-login.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  public maxSize:number = 10;
  public itemsPerPage:number=2;
  public totalItems:number=0;
  //不要手动对这个属性进行赋值，它是和分页工具条自动绑定的
  public currentPage:number = 1;
  public numPages=0;

  public postId:string;

  public comments: Array<Comment>;

  public comment:Comment=new Comment();

  private subscription:Subscription;

  public hasLogin:boolean=false;//用户是否已经登录
  
  constructor(
    public router: Router,
    public commentService: CommentService,
    public activeRoute: ActivatedRoute,
    public userLoginService: UserLoginService
  ){

  }

  ngOnInit() {
        this.activeRoute.params.subscribe(
          params => {
            this.postId=params["postId"];
            this.comment.postId=this.postId;
            this.getCommentList(params["postId"],params["pageIndex"]);
            this.getCommentPages(params["postId"]);
          }
        );
        this.hasLogin=this.userLoginService.hasLogin;
  }

  ngOnDestroy(){
    
  }

  public getCommentList(postId: string,pageIndex:string){
    this.commentService.getCommentList(postId,pageIndex)
      .subscribe(
        data => {
          this.comments = data;
        },
        error => console.error(error)
      );
  }

  public getCommentPages(postId: string){
    this.commentService.getCommentPages(postId)
      .subscribe(
        res => {
          this.totalItems=res.totalItems;
          this.itemsPerPage=res.itemsPerPage;
        },
        error => console.error(error)
      );
  }

  public pageChanged(event:any):void {
    this.router.navigateByUrl("post/postdetail/"+this.postId+"/"+event.page);
  }

  public submitCommet(){
    this.commentService.newComment(this.comment).subscribe(
      res => {
        console.log(res);
        this.currentPage=1;
        this.getCommentList(this.postId,'1');
        this.getCommentPages(this.postId);
      },
      error => console.error(error)
    );
  }
}
