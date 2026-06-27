import { Component, inject } from '@angular/core';
import { BlogCard, Facility, Location } from '../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { Color } from '../../../enums/color';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public messageService: MessageService = inject(MessageService);

  public liveInput: string = '';
  public tour = {
    location: '',
    date: '',
    participants: ''
  }

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
  public openDatePicker(input: HTMLInputElement): void {
    input.focus();
    input.showPicker();
  }
}
