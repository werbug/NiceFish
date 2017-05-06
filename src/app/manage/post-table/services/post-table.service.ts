import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PostTableService {
    public delURL: string = "";
    public toEditURL: string = "";
    public dataUrl:string = "api/post/getPostByUserId";
    
    constructor(public http: Http) { }

    public getPostTable(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.dataUrl = this.dataUrl+"/"+currentUser['userId']+"/"+1;
        return this.http.get(this.dataUrl)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    public del(postId: number):Observable<any>{
        return this.http.delete(this.delURL)
            .map((res: Response) => res.json());
    }

    public toEdit(postId: number):Observable<any>{
        return this.http.get(this.toEditURL)
            .map((res: Response) => res.json());
    }
}