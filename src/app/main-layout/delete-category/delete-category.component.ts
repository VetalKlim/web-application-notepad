import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';
import {DeleteCategory, DeletePostOfCategory} from '../../redux/category.action';
import {ServerDataUserService} from '../../services/serverDataUser.service';
import {AlertService} from '../../services/alert.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {
  loader = false;
  flagShowModal = false;
  categories;
  selectedCategory;
  postDelete;
  postDeleteServer;
  subcategoryDeleteServer;

  constructor(private store: Store<AppState>,
              private alertService: AlertService,
              private spinner: NgxSpinnerService,
              private deleteService: ServerDataUserService) {
  }

  ngOnInit() {
    this.store.select('category', 'category').subscribe(dataCategory => {
      console.log(dataCategory);
      this.categories = dataCategory || undefined;
    });
    this.selectedCategory = this.categories[0];
  }

  submitDelete() {
    this.flagShowModal = true;
  }

  yesDelete() {
    this.flagShowModal = false;
    console.log(this.selectedCategory);
    this.store.dispatch(new DeleteCategory(this.selectedCategory));
    this.loader = true;
    this.spinner.show('spinner', {
      bdColor: 'rgba(51,51,51,0.8)',
      size: 'medium',
      color: '#fff',
      type: 'ball-scale-multiple'
    });
    this.deleteService.deleteCategory(this.selectedCategory).subscribe(() => {
      this.store.select('category').subscribe((date) => {
        this.postDeleteServer = date.posts;
        this.postDelete = date.posts;
        this.subcategoryDeleteServer = date.subcategory;
        if (this.postDeleteServer) {
          this.postDeleteServer = this.postDeleteServer
            .filter(p => p.categoryId === this.selectedCategory.categoryId);
          for (let i = 0; i < this.postDeleteServer.length; i++) {
            this.deleteService.deletePostOfCategory(this.postDeleteServer[i]).subscribe(rr => {
              console.log(rr);
            });
          }
        }
        if (this.postDelete) {
          this.postDelete = this.postDelete
            .filter(p => p.categoryId === this.selectedCategory.categoryId);
          for (let i = 0; i < this.postDelete.length; i++) {
            this.store.dispatch(new DeletePostOfCategory(this.postDelete[i]));
          }
        }
        if (this.subcategoryDeleteServer) {
          this.subcategoryDeleteServer = this.subcategoryDeleteServer
            .filter(s => s.categoryId === this.selectedCategory.categoryId);
          for (let i = 0; i < this.subcategoryDeleteServer.length; i++) {
            this.deleteService.deleteSubcategory(this.subcategoryDeleteServer[i]);
          }
        }
        this.alertService.success(`Категория ${this.selectedCategory.nameCategory} удалена`);
        this.selectedCategory = this.categories[0];
      });
      this.loader = false;
      this.spinner.show('spinner');
    });
  }

  noDelete() {
    this.flagShowModal = false;
  }


}
