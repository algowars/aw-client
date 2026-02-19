import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpaces: true };
    }
    return null;
  };
}
