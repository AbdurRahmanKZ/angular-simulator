import { Component, inject } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import './training';
import './collection';
import './interfaces';
import { MessageService } from './services/message/message.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { messageTypes } from './services/message/message.type';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet, CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastLoad();
    this.saveQtyLoad();
  }

  private saveLastLoad(): void {
    const time = new Date().toString();
    this.localStorageService.set('lastLoadDate', time);
  }

  private saveQtyLoad(): void {
    const currentQty = +(this.localStorageService.get('qtyLoad') || 0);
    this.localStorageService.set('qtyLoad', String(currentQty + 1));
  }

  public addSuccessMessage(): void {
    this.messageService.addMessage({ text: 'Message Content', type: messageTypes.SUCCESS });
  }
  public addInfoMessage(): void {
    this.messageService.addMessage({ text: 'Message Content', type: messageTypes.INFO });
  }
  public addWarningMessage(): void {
    this.messageService.addMessage({ text: 'Message Content', type: messageTypes.WARNING });
  }
  public addErrorMessage(): void {
    this.messageService.addMessage({ text: 'Message Content', type: messageTypes.ERROR });
  }
}