import { Component, OnInit, Input } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { ActivatedRoute, Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { PostTableService } from './services/post-table.service';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss'],
  animations: [
    flyIn
  ]
})
export class PostTableComponent implements OnInit {
  public maxPageSize:number = 10;
  public itemsPerPage:number=2;
  public totalItems:number = 0;
  //不要手动对这个属性进行赋值，它是和分页工具条自动绑定的
  public currentPage:number = 1;

  public postList: Array<any>;

  constructor(public router: Router,
    public activeRoute: ActivatedRoute,
    public postTableService: PostTableService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.loadPostListByPage(params["page"])
    );
    this.loadPagerParam();
  }

  public loadPostListByPage(page: number) {
    return this.postTableService.getPostList(page).subscribe(
      res => {
        console.log(res);
        this.postList = res.rows;
      },
      error => { console.log(error) },
      () => { }
    );
  }

  public loadPagerParam(){
		return this.postTableService.getPagerParam().subscribe(
			res=>{
				this.totalItems=res.totalItems;
				this.itemsPerPage=res.itemsPerPage;
				this.maxPageSize=res.maxPageSize;
			},
			error=>{},
			()=>{}
		);
	}

  public pageChanged(event: any): void {
    let urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.router.navigateByUrl(s[0] + "/posttable/page/" + event.page);
  }

  public goToWrite(): void {
    this.router.navigateByUrl("user/write");
  }

  public editPost(event): void {
    var target = event.currentTarget;
    var nameAttr = target.attributes.name;
    var value = nameAttr.nodeValue;
    console.log("postId>" + value);
  }

  public top(event): void {
    var target = event.currentTarget;
    var nameAttr = target.attributes.name;
    var value = nameAttr.nodeValue;
    console.log("postId>" + value);
  }

  public unTop(event): void {
    var target = event.currentTarget;
    var nameAttr = target.attributes.name;
    var value = nameAttr.nodeValue;
    console.log("postId>" + value);
  }

  public delPost(event): void {
    var target = event.currentTarget;
    var nameAttr = target.attributes.name;
    var value = nameAttr.nodeValue;
    console.log("postId>" + value);
  }
}
