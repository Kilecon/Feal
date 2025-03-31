import { ThemeProvider } from '@shopify/restyle';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { theme } from 'theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Layout() {
  useFonts({
    'Quicksand-Regular': require('~/assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('~/assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('~/assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Bold': require('~/assets/fonts/Quicksand-Bold.ttf'),
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Stack />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
