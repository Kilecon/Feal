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
  bgInput: '#EAF3D6',
  orange: '#FBDFB8',
  green: '#C8DC9F',
  darkGreen: '#6C8437',
  darkBlue: '#0A1B3D',
  pink: '#F4AFED',
  red: '#F4AFAF',
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
    medium: 20,
    small: 10,
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
    mediumSB: {
      fontSize: 16,
      fontFamily: 'Quicksand-SemiBold',
    },
    large: {
      fontSize: 18,
    },
    buttonLabel: { fontSize: 20, fontFamily: 'Georgia' },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Georgia' },
    subtitleRegular: {
      fontSize: 24,
      fontWeight: 500,
      fontFamily: 'Georgia',
      color: 'darkBlue',
    },
    subtitle: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Georgia', color: 'darkBlue' },
    extra_large: {
      fontSize: 48,
      fontFamily: 'Georgia',
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
