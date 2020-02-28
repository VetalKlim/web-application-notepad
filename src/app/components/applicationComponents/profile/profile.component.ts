import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../../redux/app.state';
import {Store} from '@ngrx/store';
import {AlertService} from '../../../services/alert.service';
import {UpdateUserName} from '../../../redux/category.action';
import {ServerDataUserService} from '../../../services/serverDataUser.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  nameProfileUser;
  submitted = false;
  idUser;
  loader = false;
  visibleBlockEditPassword = false;

  constructor(private store: Store<AppState>,
              private spinner: NgxSpinnerService,
              private serviceDataUser: ServerDataUserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.store.select('category', 'info').subscribe(data => {
      this.nameProfileUser = data;
      this.idUser = data;
      this.nameProfileUser = this.nameProfileUser.map(p => p.name);
      this.idUser = this.idUser.map(id => id.idUser);
      this.form = new FormGroup({
        name: new FormControl(this.nameProfileUser, Validators.required),
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      this.alertService.warning('Ведите имя для изменения профиля');
      this.submitted = true;
      return;
    }
    console.log(this.form.value);
    const userName = {
      name: this.form.value.name,
      idUser: this.idUser.toString()
    };
    this.store.dispatch(new UpdateUserName(userName));
    this.loader = true;
    this.spinner.show('spinner', {
      bdColor: 'rgba(51,51,51,0.8)',
      size: 'medium',
      color: '#fff',
      type: 'ball-scale-multiple'
    });
    this.serviceDataUser.updateUserName(userName).subscribe(e => {
      this.spinner.hide('spinner');
      this.loader = false;
      this.alertService.success('Имя профиля успешно изменено');
    });
  }
}
