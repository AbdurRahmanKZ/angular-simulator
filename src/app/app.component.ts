import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgTemplateOutlet } from '@angular/common';
import { Color } from '../enums/color';
import './training';
import './collection';
import './interfaces';
import { blogCard, facility, location } from './interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, NgTemplateOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  public titleName: string = 'румтибет';
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

  public facilities: facility[] = [
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

  public locations: location[] = [
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

  blogCards: blogCard[] = [
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
    console.log(localStorage.getItem('lastLoadDate'))
    console.log(localStorage.getItem('qtyLoad'))
  }

  private checkColor(color: string): boolean {
    if (color === Color.Red) return true
    if (color === Color.Green) return true
    if (color === Color.Blue) return true
    return false
  }

  private saveLastLoad(): void {
    const time = new Date().toString();
    localStorage.setItem('lastLoadDate', time);
  }

  private saveQtyLoad(): void {
    const currentQty = Number(localStorage.getItem('qtyLoad') || 0);
    localStorage.setItem('qtyLoad', String(currentQty + 1));
  }

  private ngOnInit(): void {
    setTimeout(() => { this.isLoading = false }, 2000);
  }

  public changeColor(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.style.position = 'invert(1)';
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
}