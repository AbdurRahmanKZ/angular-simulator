import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { IUsers } from '../../../interfaces/users/users';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  private formBuider = inject(FormBuilder);

  @Output() userCreated = new EventEmitter<IUsers>();

  public userForm = this.formBuider.nonNullable.group({
    id: this.formBuider.nonNullable.control(0, [
      Validators.required,
    ]),

    name: this.formBuider.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),

    username: this.formBuider.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),

    email: this.formBuider.nonNullable.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),

    phone: this.formBuider.nonNullable.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25),
    ]),

    website: this.formBuider.nonNullable.control('', [
      Validators.maxLength(100),
    ]),

    address: this.formBuider.nonNullable.group({
      city: this.formBuider.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),

      street: this.formBuider.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      suite: this.formBuider.nonNullable.control('', [
        Validators.maxLength(50),
      ]),

      zipcode: this.formBuider.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),

      geo: this.formBuider.nonNullable.group({
        lat: this.formBuider.nonNullable.control('', [
          Validators.required,
        ]),

        ing: this.formBuider.nonNullable.control('', [
          Validators.required,
        ]),
      }),
    }),

    company: this.formBuider.nonNullable.group({
      name: this.formBuider.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),

      catchPhrase: this.formBuider.nonNullable.control('', [
        Validators.maxLength(200),
      ]),

      bs: this.formBuider.nonNullable.control('', [
        Validators.maxLength(300),
      ]),
    }),
  });

  public onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.userForm.controls.id.setValue(Date.now());

    const newUser: IUsers = this.userForm.getRawValue();

    this.userCreated.emit(newUser);

    this.userForm.reset();
  }
}
