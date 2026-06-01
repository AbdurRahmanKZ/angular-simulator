import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  titleName: string = 'румтибет';

  isLoading: boolean = true;

  checkColor(color: string): boolean {
    if (color === Color.Red) return true
    if (color === Color.Green) return true
    if (color === Color.Blue) return true
    return false
  }

  constructor() {
    this.saveLastLoad();
    this.saveQtyLoad();
    console.log(localStorage.getItem('lastLoadDate'))
    console.log(localStorage.getItem('qtyLoad'))
  }

  saveLastLoad(): void {
    const time = new Date().toString();
    localStorage.setItem('lastLoadDate', time);
  }

  saveQtyLoad(): void {
    const currentQty = Number(localStorage.getItem('qtyLoad') || 0);
    localStorage.setItem('qtyLoad', String(currentQty + 1));
  }

  ngOnInit(): void {
    setTimeout(() => {this.isLoading = false}, 2000);
  }
}