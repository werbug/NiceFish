import {RouterModule} from "@angular/router";
import { UserMainComponent } from './user-main/user-main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WritePostComponent } from '../post/write-post/write-post.component';
import { PostTableComponent } from '../manage/post-table/post-table.component';
import { CommentTableComponent } from '../manage/comment-table/comment-table.component';

export const userRoutes = [
  	{
		path:'',
		component:UserMainComponent,
	    children: [
	    	{ path: '', redirectTo:'posttable/page/1',pathMatch:'full'},
			//write这个路由需要一个路由守卫，只允许已经登录的用户能访问这个路径，请参考manage.routes.ts里面的写法补全这个功能
	    	{ path: 'write', component: WritePostComponent },
	    	{ path: 'posttable/page/:page', component: PostTableComponent },
	    	{ path: 'commenttable/page/:page', component: CommentTableComponent },
	    	{ path: 'profile', component: UserProfileComponent },
			{ path:'**', redirectTo:'write' }
	    ]
	}
];