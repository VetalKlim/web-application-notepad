import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {ServerDataUserService} from './serverDataUser.service';
import {Observable, Subscription} from 'rxjs';
import {AddCategory, AddInfo, AddPost, AddSubcategory} from '../redux/category.action';

@Injectable({providedIn: 'root'})
export class LoadingDataFromServerService {
  constructor(private store: Store<AppState>,
              private service: ServerDataUserService) {
  }

  infoUserRequestData(): Subscription {
    return this.service.serverData().subscribe(data => {
      let infoUser = [];
      if (data.info) {
        infoUser = Object.keys(data.info).map(key => ({
          ...data.info[key]
        }));
        this.store.dispatch((new AddInfo(infoUser)));
      }
    });
  }

  requestForCategoryUser(): Subscription {
    return this.service.serverData().subscribe(data => {
      let categoryUser = [];
      if (data.categorises) {
        categoryUser = Object.keys(data.categorises).map(key => ({
          ...data.categorises[key],
          categoryId: key
        }));
        for (let i = 0; i < categoryUser.length; i++) {
          this.store.dispatch(new AddCategory(categoryUser[i]));
        }
      }
    });
  }

  requestForSubcategoryUser(): Subscription {
    return this.service.serverData().subscribe(data => {
      let subcategory = [];
      if (data.subcategory) {
        subcategory = Object.keys(data.subcategory).map(key => ({
          ...data.subcategory[key],
          subcategoryId: key
        }));
        for (let i = 0; i < subcategory.length; i++) {
          this.store.dispatch(new AddSubcategory(subcategory[i]));
        }
      }
    });
  }

  requestForPostUser(): Subscription {
    return this.service.serverData().subscribe(data => {
      let post = [];
      if (data.posts) {
        post = Object.keys(data.posts).map(key => ({
          ...data.posts[key],
          postId: key
        }));
        for (let i = 0; i < post.length; i++) {
          this.store.dispatch(new AddPost(post[i]));
        }
      }
    });
  }
}
