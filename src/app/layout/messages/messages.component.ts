import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { NgTemplateOutlet } from '@angular/common';
import { messageTypes } from '../../services/message/message.type';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  messageService: MessageService = inject(MessageService);
  messages$ = this.messageService.messages$;
}
