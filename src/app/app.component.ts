import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import './training';
import './collection';
// import './interfaces';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MessagesComponent } from './layout/messages/messages.component';
import { LoaderComponent } from './layout/loader/loader.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessagesComponent, LoaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab)
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
}