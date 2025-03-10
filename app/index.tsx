import { Redirect, Stack } from 'expo-router';
import { Onboarding } from '~/screens/onboarding';
import { SafeAreaView } from 'react-native';
import { theme } from '~/theme';
import {useStorage} from '~/core/storage';

export default function Home() {
  const [isOnboarded] = useStorage("isOnboarded")
  
if (!isOnboarded){
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Onboarding />
    </SafeAreaView>
  );
};
  return (
    <Redirect href="/home"/>
  );
}
