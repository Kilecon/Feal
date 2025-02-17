import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  background: '#FFFFFF',
  gray: '#808080',
  blue: '#007AFF',
  darkGray: '#38434D',
  white: '#FFFFFF',
  black: '#000000',
  bgCard: '#FBFFF4',
  orange: '#FBDFB8',
  green: '#C8DC9F',
  darkGreen: '#6C8437',
  darkBlue: '#0A1B3D',
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xs_4: 4,
    s_8: 8,
    sm_12: 12,
    m_16: 16,
    ml_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    base: 24,
  },
  textVariants: {
    body: {
      fontSize: 16,
    },
    small: {
      fontSize: 14,
    },
    smallSB: {
      fontSize: 14,
      fontFamily: 'Quicksand-SemiBold',
    },
    smallB: {
      fontSize: 14,
      fontFamily: 'Quicksand-Bold',
    },
    medium: {
      fontSize: 16,
      fontFamily: 'Quicksand-Regular',
    },
    large: {
      fontSize: 18,
    },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Georgia' },
    subtitle: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Georgia', color: 'darkBlue' },
    extra_large: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    defaults: {
      fontFamily: 'Quicksand-Regular',
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
