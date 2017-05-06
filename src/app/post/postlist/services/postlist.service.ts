import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Post } from '../../model/post-model';

@Injectable()
export class PostlistService {
  public postListURL = 'api/post/getPostListByPage/';
  public postPagerDataURL = 'api/post/getPagerParam';
  
  constructor(public http:Http) { }
  
  public getPostList(searchText: string,page:number=1):Observable<Post[]>{
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

  public getPagerData():Observable<any>{
    return this.http
               .get(this.postPagerDataURL)
               .map((res:Response) => {
                   let result=res.json();
                   console.log("分页数据>"+result);
                   return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public addPost(user:any){

  }

  public search() {
    
  }
}
