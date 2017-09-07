import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PostTableService {
    public delURL: string = "";
    public toEditURL: string = "";
    public postListURL:string = "api/post/getPostListByUserId/";
    public postPagerDataURL = 'api/post/getPagerParamByUserId';

    constructor(public http: Http) { }

    public getPostList(page:number){
        let url = this.postListURL+page;
        return this.http
                    .get(url)
                    .map((res:Response) => {
                        let result=res.json();
                        console.log(result);
                        return result;
                    })
                    .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    public getPagerParam():Observable<any>{
        return this.http
                    .get(this.postPagerDataURL)
                    .map((res:Response) => {
                        let result=res.json();
                        return result;
                    })
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