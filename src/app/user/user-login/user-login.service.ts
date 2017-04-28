import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../model/user-model';
import * as md5 from 'md5';

@Injectable()
export class UserLoginService {
  private headers = new Headers({'Content-Type': 'application/json'});

  public userLoginURL = 'access/login';
  //顶部导航条会订阅此对象
  public subject: Subject<User> = new Subject<User>();
  
  constructor(public http:Http){}

  public get currentUser():Observable<User>{
      return this.subject.asObservable();
  }

  public login(user:User):Observable<any>{
    user.password = md5(user.password);
    return this.http
            .post(this.userLoginURL,JSON.stringify(user), {headers: this.headers})
            .map((res: Response) => {
              let result = res.json();
              return result;
            });
  }

  public logout():void{
    window.localStorage.removeItem("currentUser");
    this.subject.next(Object.assign({}));
  }

  public triggerNextValue(obj:any){
    this.subject.next(Object.assign({},obj));
  }
}
