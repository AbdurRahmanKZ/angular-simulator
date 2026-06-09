import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, NgTemplateOutlet } from '@angular/common';
import { Color } from '../enums/color';
import './training';
import './collection';
import './interfaces';
import { BlogCard, Facility, Location } from './interfaces';
import { FormsModule } from '@angular/forms';
import { MessageService } from './services/message/message.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { messageTypes } from './services/message/message.type';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, NgTemplateOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  public companyName: string = 'румтибет';
  public isLoading: boolean = true;
  public tour = {
    location: '',
    date: '',
    participants: ''
  }
  public interactive: 'counter' | 'date' = 'counter';
  public count: number = 0;
  public currentDate = new Date();
  private dateTimerId?: ReturnType<typeof setInterval>
  public liveInput: string = '';

  public facilities: Facility[] = [
    {
      id: 1,
      img: '/pictures/people.png',
      title: 'Опытный гид',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      img: '/pictures/shield.png',
      title: 'Безопасный поход',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      img: '/pictures/birk.png',
      title: 'Лояльные цены',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  public locations: Location[] = [
    {
      id: 1,
      img: '/pictures/mountain-lake.svg',
      title: 'Озеро возле гор',
      desc: 'романтическое приключение',
      price: 480,
      raiting: 4.9
    },
    {
      id: 2,
      img: '/pictures/mountain-night.svg',
      title: 'Ночь в горах',
      desc: 'в компании друзей',
      price: 500,
      raiting: 4.5
    },
    {
      id: 3,
      img: '/pictures/mountain-stretch_blurred.svg',
      title: 'Растяжка в горах',
      desc: 'для тех, кто забоится о себе',
      price: 230,
      raiting: 5.0
    }
  ]

  blogCards: BlogCard[] = [
    {
      id: 1,
      img: '/pictures/italy.svg',
      title: 'Красивая Италя, какая она в реальности?',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      img: '/pictures/plane-sky.svg',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023'
    },
    {
      id: 3,
      img: '/pictures/lone-travel.svg',
      title: 'Как подготовиться к путешествию в одиночку? ',
      desc: 'Для современного мира базовый вектор развития предполагает..',
      date: '01/04/2023'
    },
    {
      id: 4,
      img: '/pictures/india.svg',
      title: 'Индия ... летим?',
      desc: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ]

  constructor() {
    this.saveLastLoad();
    this.saveQtyLoad();
    console.log(this.localStorageService.get('lastLoadDate'))
    console.log(this.localStorageService.get('qtyLoad'))
  }

  public onSearch(): void {
    if (this.isSearchDisabled) return;

  alert(
    `Поиск тура: ${this.tour.location}, дата: ${this.tour.date}, участников: ${this.tour.participants}`
  );
  }

  private checkColor(color: string): boolean {
    if (color === Color.Red) return true
    if (color === Color.Green) return true
    if (color === Color.Blue) return true
    return false
  }

  private saveLastLoad(): void {
    const time = new Date().toString();
    this.localStorageService.set('lastLoadDate', time);
  }

  private saveQtyLoad(): void {
    const currentQty = +(this.localStorageService.get('qtyLoad') || 0);
    this.localStorageService.set('qtyLoad', String(currentQty + 1));
  }

  private ngOnInit(): void {
    setTimeout(() => { this.isLoading = false }, 2000);
  }

  public changeColor(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.style.transform = 'scale(107%)';
    element.style.transition = 'transform 0.3s ease';
  }

  public regenColor(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.removeAttribute('style');
  }

  public get isSearchDisabled(): boolean {
    return !this.tour.date || !this.tour.location || !this.tour.participants
  }

  public showDate(): void {
    this.currentDate = new Date();
    this.interactive = 'date';
    clearInterval(this.dateTimerId);

    this.dateTimerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000)
  }

  public showCounter(): void {
    clearInterval(this.dateTimerId);
    this.interactive = 'counter';
  }

  public openDatePicker(input: HTMLInputElement): void {
    input.focus();
    input.showPicker();
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