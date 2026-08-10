import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { IUsers } from '../../../interfaces/users/users';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  private formBuilder = inject(FormBuilder);

  @Output() userCreated = new EventEmitter<IUsers>();

  public userForm = this.formBuilder.nonNullable.group({
    id: this.formBuilder.nonNullable.control(0, [
      Validators.required,
    ]),

    name: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),

    username: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),

    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),

    phone: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25),
    ]),

    website: this.formBuilder.nonNullable.control('', [
      Validators.maxLength(100),
    ]),

    address: this.formBuilder.nonNullable.group({
      city: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),

      street: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      suite: this.formBuilder.nonNullable.control('', [
        Validators.maxLength(50),
      ]),

      zipcode: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),

      geo: this.formBuilder.nonNullable.group({
        lat: this.formBuilder.nonNullable.control('', [
          Validators.required,
        ]),

        lng: this.formBuilder.nonNullable.control('', [
          Validators.required,
        ]),
      }),
    }),

    company: this.formBuilder.nonNullable.group({
      name: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),

      catchPhrase: this.formBuilder.nonNullable.control('', [
        Validators.maxLength(200),
      ]),

      bs: this.formBuilder.nonNullable.control('', [
        Validators.maxLength(100),
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
