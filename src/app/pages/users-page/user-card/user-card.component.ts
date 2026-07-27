import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUsers } from '../../../interfaces/users/users';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) public user! : IUsers;

  @Output() deleteUser = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.user.id)
  }
}
