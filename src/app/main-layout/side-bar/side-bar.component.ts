import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';
import {InterfacePost} from '../../interface/interfacePost';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  closeMenu = false;
  @Output() menuClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  posts;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('category').subscribe((response) => {
      this.posts = response.posts;
      const cb = this.posts.filter(r => r.bookmark === true);
      this.posts = cb;
    });

  }

  showMenu() {
    this.menuClose.emit(this.closeMenu);
  }

  detail(postId: string) {
    console.log(postId);
  }
}
