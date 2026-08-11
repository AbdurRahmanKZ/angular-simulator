import { Color } from "../../../enums/color";

export type AppTheme =
  | 'aura'
  | 'lara'
  | 'nora'
  | 'material';

export type ColorMode =
  | 'light'
  | 'dark';

export interface ThemeState {
  theme: AppTheme;
  colorMode: ColorMode;
}