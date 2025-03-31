import { Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

import { useStorage } from '~/core/storage';
import { Onboarding } from '~/screens/onboarding';
import { theme } from '~/theme';

export default function Home() {
  const [isOnboarded] = useStorage('isOnboarded');
  if (!isOnboarded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <Onboarding />
      </SafeAreaView>
    );
  }
  return <Redirect href="/home" />;
}
