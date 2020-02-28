import {Component, OnInit} from '@angular/core';
import { Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';



@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  categories;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('category').subscribe(data => {
      this.categories = data.category;
    });
  }

  closeSubcategory(categoryId: string) {
    console.log(categoryId);

  }
}
