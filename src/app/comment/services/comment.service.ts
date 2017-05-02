import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Comment } from '../model/comment-model';

@Injectable()
export class CommentService {
    public commentListURL = "comment";
    public postPagerDataURL = 'comment/getPagerParam';

    constructor(public http: Http) { }

    public getCommentList(postId: String,pageIndex:String):Observable<Comment[]>{
        return this.http.get(this.commentListURL+"/"+postId+"/"+pageIndex)
            .map((res: Response) => {
            	let result=res.json();
            	console.log(result);
            	return result;
           	});
    }

    public getCommentPages(postId: String):Observable<any>{
        return this.http.get(this.postPagerDataURL+"/"+postId)
            .map((res: Response) => {
                let result=res.json();
                console.log(result);
                return result;
               })
    }
}