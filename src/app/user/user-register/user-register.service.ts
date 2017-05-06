import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user-model';
import * as md5 from 'md5';

@Injectable()
export class UserRegisterService {
    private headers = new Headers({'Content-Type': 'application/json'});
    public userRegisterURL = "api/access/register";
    public subject: Subject<User> = new Subject<User>();

    constructor(public http:Http) {
    }

    public get currentUser():Observable<User>{
        return this.subject.asObservable();
    }

    public register(user: User):Observable<any>{
        user.password = md5(user.password);
        return this.http
                    .post(this.userRegisterURL,JSON.stringify(user),{headers: this.headers})
                    .map((response: Response) => {
                        let result = response.json();
                        //注册成功自动切换到已登录状态
                        if(result&&!result.msg){
                            localStorage.setItem("currentUser",JSON.stringify(result));
                            this.subject.next(result);
                        }
                        return result;
                    });
    }
}