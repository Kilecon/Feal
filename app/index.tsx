import { Stack } from 'expo-router';
import { Onboarding } from '~/screens/onboarding';
import { SafeAreaView } from 'react-native';
import { theme } from '~/theme';

export default function Home() {
  const isOnboarded = false;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Onboarding />
    </SafeAreaView>
  );
}
