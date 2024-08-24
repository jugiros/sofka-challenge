import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function marginErrorValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (value.length < min || value.length > max) {
      return { marginError: { minLength: min, maxLength: max, actualLength: value.length } };
    }
    return null;
  };
}
