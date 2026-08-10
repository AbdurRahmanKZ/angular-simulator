import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usePreset } from '@primeuix/themes';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import Material from '@primeuix/themes/material';

import {
  AppTheme,
  ColorMode,
  ThemeState,
} from '../../interfaces/theme/theme';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly localStorageService = inject(LocalStorageService);

  private readonly STORAGE_KEY = 'theme-state';

  private readonly defaultState: ThemeState = {
    theme: 'aura',
    colorMode: 'light'
  };
}
