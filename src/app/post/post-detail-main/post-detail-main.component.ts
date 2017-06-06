import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { flyIn } from '../../animations/fly-in';
import { UserInfoComponent } from '../../user/user-info/user-info.component';

@Component({
  selector: 'app-post-detail-main',
  templateUrl: './post-detail-main.component.html',
  styleUrls: ['./post-detail-main.component.scss'],
  animations: [
    flyIn
  ]
})
export class PostDetailMainComponent implements OnInit {
  constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute) {

  }
  
  ngOnInit() {
  }

  ngOnDestroy(){
  }

  doFollow(){
    alert("父组件监听子组件的事件...");
  }
}