import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts;
  showPost;
  search = '';
  topic;
  category;
  searchField = 'topic';
  subcategory ;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.showPost = false;
    this.store.select('category').subscribe(response => {
      this.posts = response.posts;
    });
  }

  searchTopic() {
    this.topic = 'topic';
    this.searchField = this.topic;
    this.category = '';
    this.subcategory = '';
  }

  searchCategory() {
    this.topic = '';
    this.category = 'nameCategory';
    this.searchField = this.category;
    this.subcategory = '';
  }

  searchSubcategory() {
    this.topic = '';
    this.category = '';
    this.subcategory = 'subcategory';
    this.searchField = this.subcategory;
  }
}
