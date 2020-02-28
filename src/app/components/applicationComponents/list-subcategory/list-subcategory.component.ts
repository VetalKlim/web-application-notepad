import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.scss']
})
export class ListSubcategoryComponent implements OnInit {
  posts;

  constructor(private story: Store<AppState>, private pouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.pouter.params.subscribe((params: Params) => {
      this.story.select('category').subscribe(data => {
        this.posts = data.posts;
        this.posts = this.posts.filter(r => r.subcategoryId.toString().toLowerCase() === params.id.toString().toLowerCase());
      });
    });
  }

}
