import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';
import {UpdatePost} from '../../../redux/category.action';
import {ServerDataUserService} from '../../../services/serverDataUser.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post;
  updatePost;
  fullS = false;


  constructor(private route: ActivatedRoute,
              private serviceServer: ServerDataUserService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.select('category', 'posts').subscribe(data => {
        this.post = data;
        this.post = this.post.filter(p => p.postId === params.id);
      });
    });

  }

  showBookmark(bookmark: boolean) {
    this.updatePost = this.post;
    this.updatePost = [
      ...this.post,
    ];
    this.store.dispatch(new UpdatePost(this.updatePost));
    const postUpdate = this.updatePost.find(p => p.postId === p.postId);
    this.serviceServer.editPost(postUpdate);
  }

  openWindow() {
    this.fullS = true;
  }

  closeWindow() {
    this.fullS = false;
  }
}
