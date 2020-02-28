import {FormGroup} from '@angular/forms';

// пользовательский валидатор для проверки соответствия двух полей
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // ернуть, если другой валидатор уже обнаружил ошибку в MatchControl
      return;
    }

    // становить ошибку на matchControl, если проверка не удалась
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
