import { ThemeProvider } from '@shopify/restyle';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { theme } from 'theme';

export default function Layout() {
  useFonts({
    'Quicksand-Regular': require('~/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('~/assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('~/assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Bold': require('~/assets/fonts/Quicksand-Bold.ttf'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack />
    </ThemeProvider>
  );
}
