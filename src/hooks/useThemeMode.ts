import {useLayoutEffect, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

const useThemeMode = () => {
  const [theme, setTheme] = useState<ColorSchemeName>('light');

  useLayoutEffect(() => {
    const initTheme = Appearance.getColorScheme();
    setTheme(initTheme);
    Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
  }, []);

  return theme;
};

export default useThemeMode;
