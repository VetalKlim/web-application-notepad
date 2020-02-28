import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';
import {UpdateCategory} from '../../redux/category.action';
import {ServerDataUserService} from '../../services/serverDataUser.service';
import {AlertService} from '../../services/alert.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  loader = false;
  formEdit: FormGroup;
  categories; // категории которые пришли с сервера
  selectedCategory; // категория которая на данный мемент выбрана и показывается по умолчанию в списке.
  selectInput; // переменная которая связана с input

  constructor(private store: Store<AppState>,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private serviceEditCategory: ServerDataUserService) {
  }

  ngOnInit() {
    this.store.select('category', 'category').subscribe(data => {
      this.categories = data || undefined;
    });
    this.selectedCategory = this.categories[0]; // берем первое значение списка и вставляем его дефолтного показа в списке.
    this.selectInput = this.selectedCategory; // категорию передаем в input
    if (this.selectInput === undefined) { // если категорий нет устанавливаем пустую строку.
      this.selectInput = '';
    }
    this.formEdit = new FormGroup({
      editCategory: new FormControl(`${this.selectInput.nameCategory}`, [
        Validators.required
      ]),
    });

  }

  submit() {
    if (this.formEdit.invalid) {
      this.alertService.warning('Ведите название темы');
      return;
    }
    const updateCategory = {
      ...this.selectInput,
      nameCategory: this.formEdit.value.editCategory
    };
    const identityCheck = [];
    this.categories.filter(elem => {
      if (elem.nameCategory === updateCategory.nameCategory) {
        identityCheck.push(0);
      } else {
        identityCheck.push(1);
      }
    });
    if (identityCheck.every(r => r === 1)) {
      this.store.dispatch(new UpdateCategory(updateCategory));
      this.loader = true;
      this.spinner.show('spinner', {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'medium',
        color: '#fff',
        type: 'ball-scale-multiple'
      });
      this.serviceEditCategory.editCategory(updateCategory).subscribe(r => {
        this.loader = false;
        this.spinner.hide('spinner');
        this.alertService.success('Категория отредатирована');
      });
    } else {
      this.alertService.danger('Такая категория есть');
    }
    this.selectedCategory = this.categories[0];
    this.selectInput = this.selectedCategory;
  }

  selected() {
    this.selectInput = this.selectedCategory; // при выборе с списка передаем в input.
    this.formEdit = new FormGroup({
      editCategory: new FormControl(`${this.selectInput.nameCategory}`, [
        Validators.required
      ]),
    });
  }

}
