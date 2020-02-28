import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {InterfaceAuth} from '../../interface/interfaceAuth';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private spinner: NgxSpinnerService,
              private pouter: Router,
              private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.alertService.warning('Неправильно введены данные для входа в панель администратора');
      return;
    }
    const user: InterfaceAuth = {
      password: this.form.value.password,
      email: this.form.value.email,
      returnSecureToken: true
    };
    this.spinner.show('spinner', {
      bdColor: 'rgba(51,51,51,0.8)',
      size: 'medium',
      color: '#fff',
      type: 'ball-scale-multiple'
    });
    this.auth.login(user).subscribe(() => {
      this.spinner.hide('spinner');
      this.pouter.navigate(['/adminUser/editStartPage']);
    });
  }
}
