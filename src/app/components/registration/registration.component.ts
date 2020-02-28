import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../Validations/validator.musMatch';
import {FbUserInfo, InterfaceAuth} from '../../interface/interfaceAuth';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  errorText = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {validator: MustMatch('password', 'confirmPassword')}
    );
  }

  // удобство получения для быстрого доступа к полям формы
  get f() {
    return this.form.controls;
  }

  submit() {
    this.errorText = '';
    if (this.form.invalid) {
      this.errorText = 'Введите коректные данные для регистрации';
      this.submitted = true;
      return;
    }
    this.submitted = false;

    const user: InterfaceAuth = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };
    const userInfo: FbUserInfo = {
      name: this.form.value.name
    };

    this.auth.authRegistration(user).subscribe(() => {
      this.form.reset();
      this.auth.createInfoUser(userInfo).subscribe((r) => {
        this.router.navigate(['/user', 'home']);
      });
    });
  }

  clearForm() {
    this.form.reset();
    this.auth.error$.next('');
    this.errorText = '';
  }
}
