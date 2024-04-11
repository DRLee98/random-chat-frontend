import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    primary: Color;
    red: Color;
    orange: Color;
    yellow: Color;
    green: Color;
    mint: Color;
    teal: Color;
    cyan: Color;
    blue: Color;
    indigo: Color;
    purple: Color;
    pink: Color;
    brown: Color;
    gray100: Color;
    gray200: Color;
    gray300: Color;
    gray400: Color;
    gray500: Color;
    gray600: Color;
    gray700: Color;
  }
}

export interface Color {
  default: string;
  accessible: string;
}
