import { Stack, Link, Redirect } from 'expo-router';

import { Container } from '~/components/Container';
import {Onboarding} from '~/screens/OnboardingScreen2';

export default function Home() {
  const isOnboarded = false;
  
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <Onboarding/>
      </Container>
    </>
  );
}