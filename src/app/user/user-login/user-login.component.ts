import { Component, OnInit,Input,ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from './user-login.service';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user-model';
import { fadeIn } from '../../animations/fade-in';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [ fadeIn ]
})
export class UserLoginComponent implements OnInit {
    public user:User = new User();
    public error : Error;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public userLoginService: UserLoginService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef
    ) {
        console.log(this.userLoginService);
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        console.log("--- user-login-component ---");
        console.log(this.router);
        console.log(this.activatedRoute);

        let activatedRouteSnapshot:ActivatedRouteSnapshot=this.activatedRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        console.log(activatedRouteSnapshot);
        console.log(routerState);
        console.log(routerStateSnapshot);
    }

    public doLogin():void{
      console.log("登录表单>"+this.user);
      this.userLoginService.login(this.user).subscribe(
        res=>{
            console.log(res);
            if(!res||res.msg){
              this.toastr.error(res.msg,'系统提示');
            }else{
              this.userLoginService.hasLogin=true;
              window.localStorage.setItem("currentUser",JSON.stringify(Object.assign(this.user,res)));
              this.userLoginService.triggerNextValue(res);
            }
        },
        error => {console.log(error)},
        () => {}
      );
    }

    public doLogout():void{
      this.userLoginService.logout();
      this.router.navigateByUrl("home");
    }

    public forgetPwd():void{
      this.router.navigateByUrl("forgetpwd");
    }
}
