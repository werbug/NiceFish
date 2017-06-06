import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../model/user-model';
import * as md5 from 'md5';

@Injectable()
export class UserLoginService {
  private headers = new Headers({'Content-Type': 'application/json'});

  public userLoginURL = 'api/access/login';
  public userLogoutURL='api/access/logout';

  /**
   * 需要监控用户登录状态的地方都可以订阅这个主题
   */
  public subject: Subject<User> = new Subject<User>();

  public hasLogin:boolean=false;
  
  constructor(public http:Http){}

  public get currentUser():Observable<User>{
      return this.subject.asObservable();
  }

  public login(user:User):Observable<any>{
    return this.http
            .post(this.userLoginURL,JSON.stringify({userName:user.userName,password:md5(user.password)}), {headers: this.headers})
            .map((res: Response) => {
              let result = res.json();
              return result;
            });
  }

  public logout():Observable<any>{
      return this.http
            .get(this.userLogoutURL)
            .map((res:Response)=>{
                  console.log("用户退出登录...");
                  this.hasLogin=false;
                  window.localStorage.removeItem("currentUser");
                  this.subject.next(Object.assign({}));
                  return res;
            });
  }

  public triggerNextValue(obj:any){
    this.subject.next(Object.assign({},obj));
  }
}
