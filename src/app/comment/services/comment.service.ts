import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Comment } from '../model/comment-model';

@Injectable()
export class CommentService {
    private headers = new Headers({'Content-Type': 'application/json'});
    public commentListURL = 'api/comment';
    public postPagerDataURL = 'api/comment/getPagerParam';
    public newCommentURL = 'api/comment/newComment';

    constructor(public http: Http) { }

    public getCommentList(postId: string,pageIndex:string):Observable<Comment[]>{
        return this.http.get(this.commentListURL+"/"+postId+"/"+pageIndex)
            .map((res: Response) => {
            	let result=res.json();
            	console.log(result);
            	return result;
           	});
    }

    public getCommentPages(postId: string):Observable<any>{
        return this.http.get(this.postPagerDataURL+"/"+postId)
            .map((res: Response) => {
                let result=res.json();
                console.log(result);
                return result;
               })
    }

    public newComment(comment:Comment):Observable<any>{
        return this.http
          .post(this.newCommentURL,JSON.stringify(comment), {headers: this.headers})
          .map((res: Response) => {
            let result = res.json();
            console.log(result);
            return result;
          });
  }
}