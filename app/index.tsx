import { Stack } from 'expo-router';
import { Onboarding } from '~/screens/onboarding';
import { SafeAreaView } from 'react-native';

export default function Home() {
  const isOnboarded = false;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Onboarding />
    </SafeAreaView>
  );
}
