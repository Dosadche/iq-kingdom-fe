import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export enum InputError {
  Required = 'required',
  Email = 'email',
  MinLength = 'minlength',
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() isPassword: boolean = false;

  get errorMessage(): string | undefined {
    const errors = this.form.get(this.controlName)?.errors;
    if (!errors || this.form.get(this.controlName)?.untouched) return;
    if (InputError.Required in errors) {
      return 'This field is required';
    } else if (InputError.Email in errors) {
      return 'Please enter valid email address';
    } else if (InputError.MinLength in errors) {
      return `Minimum length is ${
        errors[InputError.MinLength]?.requiredLength
      }`;
    }
    return 'Please enter valid value';
  }
}
