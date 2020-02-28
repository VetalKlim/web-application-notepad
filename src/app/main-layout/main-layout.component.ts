import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {ServerDataUserService} from '../services/serverDataUser.service';
import {AddCategory, AddInfo, AddPost, AddSubcategory} from '../redux/category.action';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  menuActive = false;
  data;

  constructor(
    private spinner: NgxSpinnerService,
    private service: ServerDataUserService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.service.serverData().subscribe(data => {
      // Вытаскиваем все данные с сервера и записываем их в store.
      console.log(data);
      let categoryUser = [];
      let infoUser = [];
      let subcategory = [];
      let post = [];
      if (data.categorises) {
        categoryUser = Object.keys(data.categorises).map(key => ({
          ...data.categorises[key],
          categoryId: key
        }));
        for (let i = 0; i < categoryUser.length; i++) {
          this.store.dispatch(new AddCategory(categoryUser[i]));
        }
      }
      if (data.info) {
        infoUser = Object.keys(data.info).map(key => ({
          ...data.info[key],
          idUser: key
        }));
        this.store.dispatch((new AddInfo(infoUser)));
      }
      if (data.subcategory) {
        subcategory = Object.keys(data.subcategory).map(key => ({
          ...data.subcategory[key],
          subcategoryId: key
        }));
        for (let i = 0; i < subcategory.length; i++) {
          this.store.dispatch(new AddSubcategory(subcategory[i]));
        }
      }
      if (data.posts) {
        post = Object.keys(data.posts).map(key => ({
          ...data.posts[key],
          postId: key
        }));
        for (let i = 0; i < post.length; i++) {
          this.store.dispatch(new AddPost(post[i]));
        }
      }
      this.spinner.hide();
    });
  }

  showMenu(menu: boolean) {
    this.menuActive = menu;
  }

}
