import { Injectable } from '@angular/core';
import { messageTypes, IMessage } from './message.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messageTypes = messageTypes;
  private nextId: number = 1;

  // private messages: IMessage[] = [];
  // get list(): readonly IMessage[] {
  //   return this.messages;
  // }

  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  readonly messages$ = this.messagesSubject.asObservable();

  private addMessage(newMessage: Omit<IMessage, 'id'>): void {
    const message: IMessage = {
      id: this.nextId++,
      ...newMessage
    };
    // this.messages.unshift(message);

    this.messagesSubject.next([
      message,
      ...this.messagesSubject.value
    ])
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    // this.messages = this.messages.filter(message => message.id != id);
    this.messagesSubject.next(
      this.messagesSubject.value.filter(message => message.id != id)
    )
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
