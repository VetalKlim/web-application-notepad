import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateTopic} from '../../interface/interfaceTopic';
import {AddCategory} from '../../redux/category.action';
import {ServerDataUserService} from '../../services/serverDataUser.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';
import {AlertService} from '../../services/alert.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  formCreate: FormGroup;
  categoryStore;
  loader = false;

  constructor(
    private createService: ServerDataUserService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('category', 'category').subscribe(r => {
      this.categoryStore = r;
    });
    this.formCreate = new FormGroup({
      nameCategory: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submitCreate() {
    if (this.formCreate.invalid) {
      this.alertService.warning('Ведите название категории');
      return;
    }
    const name = this.formCreate.value;
    const identityCheck = [];
    this.categoryStore.filter(r => {
        if (r.nameCategory.toString().toLowerCase() === name.nameCategory.toString().toLowerCase()) {
          identityCheck.push(0);
        } else {
          identityCheck.push(1);
        }
      }
    );
    if (identityCheck.every(r => r === 1)) {
      this.loader = true;
      this.spinner.show('spinner', {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'medium',
        color: '#fff',
        type: 'ball-scale-multiple'
      });
      this.createService.createCategory(name).subscribe((dataCategory) => {
        const updateName: CreateTopic = {
          ...name,
          categoryId: dataCategory.name
        };
        this.loader = false;
        this.spinner.hide('spinner');
        this.store.dispatch(new AddCategory(updateName));
        this.alertService.success(`Категория ${updateName.nameCategory} создана успешно`);
        this.formCreate.reset();
        this.store.select('category', 'category').subscribe(response => {
          this.categoryStore = response;
        });
      });
    } else {
      this.alertService.danger(`Категория ${name.nameCategory} создана, создайте другую`);
    }
    this.formCreate = new FormGroup({
      nameCategory: new FormControl('', [
        Validators.required
      ])
    });
  }
}
