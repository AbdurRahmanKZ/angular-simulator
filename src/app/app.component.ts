import { Component } from '@angular/core';
import { JsonPipe, DatePipe } from '@angular/common';
import { Color } from '../enums/color';
import './training';
import './collection';
import './interfaces';
import { facility } from './interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe, DatePipe],
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
    element.style.filter = 'invert(1)';
    element.style.position = 'invert(1)';
    element.style.background = 'white';
    element.style.border = '10px solid green';
    element.style.transform = 'scale(1.05)';
    element.style.overflow = 'hidden';
    element.style.transition = 'transform 0.3s ease';
  }

  public regenColor(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.style = '';
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
}