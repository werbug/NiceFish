import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CommentService } from '../services/comment.service';
import { Comment } from '../model/comment-model';

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

  public postId:String;

  public comments: Array<Comment>;

  constructor(
    public router: Router,
    public commentService: CommentService,
    public activeRoute: ActivatedRoute
  ){

  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.postId=params["postId"];
        this.getCommentList(params["postId"],params["pageIndex"]);
        this.getCommentPages(params["postId"]);
      }
    );
  }

  public getCommentList(postId: String,pageIndex:String){
    this.commentService.getCommentList(postId,pageIndex)
      .subscribe(
        data => {
          this.comments = data;
        },
        error => console.error(error)
      );
  }

  public getCommentPages(postId: String){
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
}
