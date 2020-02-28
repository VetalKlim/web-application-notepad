import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ServerDataUserService} from '../../../services/serverDataUser.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../redux/app.state';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  formDelete: FormGroup;
  submitted: boolean;
  create = true;
  edit = false;
  delete = false;

  constructor(private createService: ServerDataUserService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.formDelete = new FormGroup({
      deleteTopic: new FormControl('', [
        Validators.required
      ])
    });
  }

  createTopic() {
    this.create = true;
    this.edit = false;
    this.delete = false;
  }

  editTopic() {
    this.create = false;
    this.edit = true;
    this.delete = false;
  }

  deleteTopic() {
    this.create = false;
    this.edit = false;
    this.delete = true;
  }


}
