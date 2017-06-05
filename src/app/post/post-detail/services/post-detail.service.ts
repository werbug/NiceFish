import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../model/post-model';

@Injectable()
export class PostDetailService {
    public postDetailURL = "api/post/postdetail/";

    constructor(public http: Http) { 
    }

    public getPostDetail(id:String):Observable<Post>{
        return 	this.http
        			.get(this.postDetailURL+id)
                	.map((res: Response) => {
                		let result=res.json();
                		console.log(result);
                		return result;
                	});
    }
}