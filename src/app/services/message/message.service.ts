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

  showWarn(message: string): void {
    this.addMessage({ text: message, type: messageTypes.WARNING });
  }

  showError(message: string): void {
    this.addMessage({ text: message, type: messageTypes.ERROR });
  }

  showSuccess(message: string): void {
    this.addMessage({ text: message, type: messageTypes.SUCCESS });
  }

  showInfo(message: string): void {
    this.addMessage({ text: message, type: messageTypes.INFO });
  }
}
