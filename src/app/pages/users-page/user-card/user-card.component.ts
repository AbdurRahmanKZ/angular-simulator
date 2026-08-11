import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUsers } from '../../../interfaces/users/users';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-card',
  imports: [FontAwesomeModule],
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
