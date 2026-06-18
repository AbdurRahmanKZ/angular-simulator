import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { NgTemplateOutlet } from '@angular/common';
import { messageTypes } from '../../services/message/message.type';


@Component({
  selector: 'app-messages',
  imports: [NgTemplateOutlet,],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  messageService: MessageService = inject(MessageService);

  public addSuccessMessage(): void {
    this.messageService.showSuccess();
  }
  public addInfoMessage(): void {
    this.messageService.showInfo();
  }
  public addWarningMessage(): void {
    this.messageService.showWarn();
  }
  public addErrorMessage(): void {
    this.messageService.showError();
  }
}
