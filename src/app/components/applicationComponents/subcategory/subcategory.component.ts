import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  subcategory = [];
  sub;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(idSubcategory => {
      this.store.select('category').subscribe(response => {
        this.sub = response.subcategory;
        this.subcategory = this.sub.filter(r => r.categoryId === idSubcategory.id);
      });
    });
  }

}
