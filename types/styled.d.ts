import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends CommonTheme {
    bgColor: string;
    fontColor: string;
  }
}
