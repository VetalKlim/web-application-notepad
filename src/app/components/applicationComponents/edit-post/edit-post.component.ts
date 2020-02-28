import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DeletePostEdit, UpdatePost} from '../../../redux/category.action';
import {ServerDataUserService} from '../../../services/serverDataUser.service';
import {AlertService} from '../../../services/alert.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post;
  form: FormGroup;
  errorMessage;
  idPost;
  success = '';

  constructor(
    private alertService: AlertService,
    private store: Store<AppState>,
    private serviceServer: ServerDataUserService,
    private rout: Router,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.idPost = params;
      this.store.select('category').subscribe(data => {
        this.post = data.posts;
        this.post = this.post.find(p => p.postId === params.id);
        if (this.post) {
          this.form = new FormGroup({
            topic: new FormControl(`${this.post.topic}`, Validators.required),
            text: new FormControl(this.post.contentPost, Validators.required)
          });
        }
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      if (this.form.get('topic').invalid) {
        this.alertService.warning('Не заполнена тема поста');
      } else {
        this.alertService.warning('Заолни текст в форме');
      }
      return;
    }

    this.post = {
      ...this.post,
      contentPost: this.form.value.text,
      topic: this.form.value.topic
    };
    console.log(this.post);
    this.store.dispatch(new UpdatePost(this.post));
    this.serviceServer.editPost(this.post).subscribe(r => {
      this.rout.navigate(['/user/post', this.idPost.id]);
    });
  }

  deletePost(e: Event) {
    e.preventDefault();
    this.serviceServer.deletePostOfCategory(this.post).subscribe(data => {
      this.store.dispatch(new DeletePostEdit(this.post));
      this.alertService.success('Пост удален');
      this.rout.navigate(['/user/home']);
    });
  }
}
