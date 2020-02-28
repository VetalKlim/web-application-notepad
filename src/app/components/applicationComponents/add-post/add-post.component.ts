import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  AddPost,
  AddSubcategory,
  DeletePostOfSubcategory,
  DeleteSubcategory,
  UpdatePostOfSubcategory,
  UpdateSubcategory
} from '../../../redux/category.action';
import {ServerDataUserService} from '../../../services/serverDataUser.service';
import {InterfacePost} from '../../../interface/interfacePost';
import {AlertService} from '../../../services/alert.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  submitted = false;
  addSubcategoryFlag = false;
  editSubcategoryFlag = false;
  deleteSubcategoryFlag = false;
  checkboxButton = false;
  categories;
  selectedCategory;
  form: FormGroup;
  subcategory;
  newSubcategory;
  subcategorySelectedEdit;
  editSubcategoryInput;
  subcategorySelectedDelete;
  selectedSubcategory;
  sortedSubcategory: any = [];
  postsDeleteSubcategory;
  postEditSubcategory;


  constructor(
    private store: Store<AppState>,
    private alertService: AlertService,
    private serviceDataServer: ServerDataUserService) {

  }


  ngOnInit() {

    this.store.select('category', 'category').subscribe(data => {
      this.categories = data;
      this.selectedCategory = this.categories[0];
      console.log(this.selectedCategory);
      this.store.select('category', 'subcategory').subscribe(data2 => {
        this.subcategory = data2;
      });
    });
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      post: new FormControl('', [
        Validators.required
      ])
    });
  }

  submit() {
    if (this.form.invalid || this.selectedSubcategory === undefined) {
      if (this.selectedSubcategory === undefined) {
        this.alertService.warning('Выбери подкатегорию (есди нет то создай)');
      } else if (this.form.get('post').invalid) {
        this.alertService.warning('Заполни форму поста.');
      } else {
        this.alertService.warning('Укажи тему поста.');
      }
      this.submitted = true;
      return;
    }
    this.submitted = false;
    const post: InterfacePost = {
      nameCategory: this.selectedCategory.nameCategory,
      categoryId: this.selectedCategory.categoryId,
      topic: this.form.value.title,
      subcategory: this.selectedSubcategory.subcategory,
      subcategoryId: this.selectedSubcategory.subcategoryId,
      contentPost: this.form.value.post,
      date: new Date(),
      bookmark: this.checkboxButton
    };
    this.serviceDataServer.addPost(post).subscribe(response => {
      const addPost: InterfacePost = {
        ...post,
        postId: response.name
      };
      this.store.dispatch(new AddPost(addPost));
    });
    this.form.reset();
    this.checkboxButton = false;

  }

  showAddSubcategory(e: Event) {
    e.preventDefault();

    this.addSubcategoryFlag = this.addSubcategoryFlag ? false : true;
    this.editSubcategoryFlag = false;
    this.deleteSubcategoryFlag = false;
    this.newSubcategory = '';
  }

  showEditSubcategory(e: Event) {
    e.preventDefault();
    this.addSubcategoryFlag = false;
    this.editSubcategoryFlag = this.editSubcategoryFlag ? false : true;
    this.deleteSubcategoryFlag = false;
    this.subcategorySelectedEdit = this.sortedSubcategory[0];
    this.editSubcategoryInput = this.subcategorySelectedEdit.subcategory;
  }

  showDeleteSubcategory(e: Event) {
    e.preventDefault();
    this.addSubcategoryFlag = false;
    this.editSubcategoryFlag = false;
    this.deleteSubcategoryFlag = this.deleteSubcategoryFlag ? false : true;
    this.subcategorySelectedDelete = this.sortedSubcategory[0];
  }

  addSubcategory(e: Event) {
    e.preventDefault();
    console.log(this.newSubcategory);
    console.log(this.selectedCategory);
    if (this.newSubcategory) {
      const newSubcategoryUser = {
        subcategory: this.newSubcategory,
        categoryId: this.selectedCategory.categoryId
      };
      const identityCheck = [];
      this.sortedSubcategory.forEach(elem => {
        if (elem.subcategory.toString().toLowerCase() === newSubcategoryUser.subcategory.toString().toLowerCase()) {
          identityCheck.push(0);
        } else {
          identityCheck.push(1);
        }
      });
      if (identityCheck.every(r => r === 1)) {
        this.serviceDataServer.AddSubcategory(newSubcategoryUser).subscribe(data => {
          const subcategory = {
            subcategoryId: data.name,
            ...newSubcategoryUser
          };
          console.log(subcategory);
          this.store.dispatch(new AddSubcategory(subcategory));
          this.store.select('category').subscribe(response => {
            console.log(response.subcategory);
            this.sortedSubcategory = response.subcategory;
            this.selectedCategory = subcategory.subcategory;
            this.selectedCategory = this.categories.find(r => r.categoryId === newSubcategoryUser.categoryId);
            const SubcategorySelection = this.subcategory.filter(c => c.categoryId === this.selectedCategory.categoryId);
            this.sortedSubcategory = SubcategorySelection;
            this.selectedSubcategory = SubcategorySelection[0];
            this.alertService.success(`Подкатегория ${newSubcategoryUser.subcategory} создана`);
            this.newSubcategory = '';
            this.addSubcategoryFlag = false;
          });
        });
      } else {
        this.alertService.warning('Такая подкатегория уже существует');
      }

    } else {
      this.alertService.warning('Поле не должно быть пустое');
    }
  }

  editSubcategory(e: Event) {
    e.preventDefault();
    if (this.editSubcategoryInput) {
      const editSubcategory = {
        subcategory: this.editSubcategoryInput,
        subcategoryId: this.subcategorySelectedEdit.subcategoryId
      };

      // проверяем на идентичность подкатегорий.
      const identityCheck = [];
      this.sortedSubcategory.forEach(elem => {
        if (elem.subcategory.toString().toLowerCase() === editSubcategory.subcategory.toString().toLowerCase()) {
          identityCheck.push(0);
        } else {
          identityCheck.push(1);
        }
      });
      if (identityCheck.every(r => r === 1)) {
        this.serviceDataServer.editSubcategory(editSubcategory).subscribe(() => {
          this.store.dispatch(new UpdatePostOfSubcategory(editSubcategory));
          this.store.dispatch(new UpdateSubcategory(editSubcategory));
          this.store.select('category').subscribe(response => {
            this.sortedSubcategory = response.subcategory;
            this.postEditSubcategory = response.posts;
            this.selectedCategory = this.categories.find(r => r.categoryId === this.selectedCategory.categoryId);
            const subcategorySelection = this.subcategory.filter(c => c.categoryId === this.selectedCategory.categoryId);
            this.sortedSubcategory = subcategorySelection;
            this.selectedSubcategory = subcategorySelection[0];
            this.postEditSubcategory = this.postEditSubcategory.filter(p => p.subcategoryId === editSubcategory.subcategoryId);
            for (let i = 0; i < this.postEditSubcategory.length; i++) {
              this.serviceDataServer.editPost(this.postEditSubcategory[i]);
            }
            this.alertService.success('Подкатегория была успешно изменена');
            this.addSubcategoryFlag = false;
            this.editSubcategoryFlag = false;
            this.deleteSubcategoryFlag = false;
          });
        });
      } else {
        this.alertService.danger('Такая подкатегория уже существует');
      }
    } else {
      this.alertService.danger('Поле не должно быть пустое');
    }
  }

  deleteSubcategory(e: Event) {
    e.preventDefault();
    this.serviceDataServer.deleteSubcategory(this.subcategorySelectedDelete).subscribe(() => {
      this.store.select('category').subscribe(response => {
        this.sortedSubcategory = response.subcategory;
        this.postsDeleteSubcategory = response.posts;
        console.log(this.subcategorySelectedDelete);
        console.log(this.postsDeleteSubcategory);
        const postsDeleteSubcategory = this.postsDeleteSubcategory
          .filter(p => p.subcategoryId === this.subcategorySelectedDelete.subcategoryId);
        console.log(postsDeleteSubcategory);
        for (let i = 0; i < postsDeleteSubcategory.length; i++) {
          this.serviceDataServer.deletePostOfCategory(this.postsDeleteSubcategory[i]);
        }
        this.selectedCategory = this.categories.find(r => r.categoryId === this.subcategorySelectedDelete.categoryId);
        const SubcategorySelection = this.subcategory.filter(c => c.categoryId === this.selectedCategory.categoryId);
        this.sortedSubcategory = SubcategorySelection;
        this.selectedSubcategory = SubcategorySelection[0] || undefined;
        this.addSubcategoryFlag = false;
        this.editSubcategoryFlag = false;
        this.deleteSubcategoryFlag = false;
        this.alertService.success(`Подкатегория  ${this.subcategorySelectedDelete.subcategory} удалена`);
      });
      this.store.dispatch(new DeleteSubcategory(this.subcategorySelectedDelete));
      this.store.dispatch(new DeletePostOfSubcategory(this.subcategorySelectedDelete));
    });
  }

  subcategorySelection() {

    const SubcategorySelection = this.subcategory.filter(r => r.categoryId === this.selectedCategory.categoryId);
    this.sortedSubcategory = SubcategorySelection;
    this.selectedSubcategory = SubcategorySelection[0];

    this.addSubcategoryFlag = false;
    this.editSubcategoryFlag = false;
    this.deleteSubcategoryFlag = false;
  }

  closeButtons() {
    this.addSubcategoryFlag = false;
    this.editSubcategoryFlag = false;
    this.deleteSubcategoryFlag = false;
  }

  checkbox() {
    this.checkboxButton = this.checkboxButton ? false : true;
  }
}


