import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  public isScrolled: boolean = false;
  public companyName: string = 'румтибет';
  public interactive: 'counter' | 'date' = 'counter';
  public count: number = 0;
  public currentDate = new Date();
  private dateTimerId?: ReturnType<typeof setInterval>
  public navLinks = [
    {
      id: 1,
      name: 'main',
      path: '/',
    },
    {
      id: 2,
      name: 'users',
      path: '/users' 
    }
  ];


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
