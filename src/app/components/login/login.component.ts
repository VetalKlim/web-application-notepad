import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InterfaceAuth} from '../../interface/interfaceAuth';
import {from} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  errorMassageAuthUser = '';
  errorText = '';

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private route: Router,
              private  rout: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.rout.queryParams.subscribe((params: Params) => {
      if (params.needToRegister) {
        this.errorMassageAuthUser = 'Войдите пожалуйста в систему!';
      } else if (params.authFailed) {
        this.errorMassageAuthUser = 'Ошибка авторизации';
      }
    });

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  // удобство получения для быстрого доступа к полям формы
  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.errorText = 'Введите правельные данные для входа в ситстему';
      this.submitted = true;
      return;
    }
    const user: InterfaceAuth = {
      password: this.form.value.password,
      email: this.form.value.email,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe(() => {
        this.submitted = true;
        this.form.reset();
        this.route.navigate(['/user', 'home']);
      }
    );
  }
}
