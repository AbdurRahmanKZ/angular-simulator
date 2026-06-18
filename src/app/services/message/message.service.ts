import { Injectable } from '@angular/core';
import { messageTypes, IMessage } from './message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messageTypes = messageTypes;
  private messages: IMessage[] = [];
  private nextId: number = 1;

  get list(): readonly IMessage[] {
    return this.messages;
  }

  private addMessage(newMessage: Omit<IMessage, 'id'>): void {
    const message = {
      id: ++this.nextId,
      ...newMessage
    }
    this.messages.unshift(message);
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter(message => message.id != id);
  }

  showWarn(): void {
    this.addMessage({ text: 'Message Content', type: messageTypes.WARNING });
  }

  showError(): void {
    this.addMessage({ text: 'Message Content', type: messageTypes.ERROR });
  }

  showSuccess(): void {
    this.addMessage({ text: 'Message Content', type: messageTypes.SUCCESS });
  }

  showInfo(): void {
    this.addMessage({ text: 'Message Content', type: messageTypes.INFO });
  }
}
