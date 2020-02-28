import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterfaceAuth} from '../../interface/interfaceAuth';
import {AuthService} from '../../services/auth.service';
import {MustMatch} from '../../Validations/validator.musMatch';
import {AlertService} from '../../services/alert.service';
import {animate, keyframes, query, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  animations: [
    trigger('animations', [
      transition(':enter', [
        query('form', animate(0, style({opacity: 0}))),
        animate('1s', keyframes([
          style({
            borderRadius: '100%',
            maxWidth: '20px',
            maxHeight: '20px',
            borderTop: '1px solid var(--header-background-color)',
            offset: 0.1,
          }),
          style({
            borderTop: '0px solid',
            borderRight: '2px solid var(--header-background-color)',
            maxWidth: '20px',
            maxHeight: '20px',
            offset: 0.2
          }),
          style({
            borderRight: '0px solid ',
            borderBottom: '2px solid var(--header-background-color)',
            maxWidth: '20px',
            maxHeight: '20px',
            offset: 0.3
          }),
          style({
            borderBottom: '0px solid ',
            borderLeft: '2px solid var(--header-background-color)',
            maxWidth: '20px',
            borderRadius: '100%',
            maxHeight: '20px',
            offset: 0.4
          }),
          style({
            borderLeft: '0px solid',
            borderBottom: '0px solid',
            borderRight: '0px solid',
            borderTop: '2px solid var(--header-background-color)',
            borderRadius: '0%',
            maxWidth: '20px',
            offset: 0.5
          }),
          style({
            borderTop: '2px solid var(--header-background-color)',
            maxWidth: '200px',
            offset: 0.6
          }),
          style({
            opacity: 1,
            maxWidth: '600px',
            maxHeight: '600px',
            offset: 1
          })
        ]))

      ])
    ])
  ]
})
export class EditPasswordComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  // closeBlock = false;
  form: FormGroup;
  submitted: boolean;

  constructor(
    private serviceAuth: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validator: MustMatch('password', 'confirmPassword')});
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.submitted = true;
      console.log(this.form.invalid);
      return;
    }

    const newPassword: InterfaceAuth = {
      idToken: localStorage.getItem('fb-token'),
      password: this.form.value.password,
      returnSecureToken: true
    };
    this.serviceAuth.updateUserPassword(newPassword).subscribe(data => {
      this.alertService.success('Пароль успешно изменен');
      this.form.reset();
      this.close.emit(false);
    });
  }
}
