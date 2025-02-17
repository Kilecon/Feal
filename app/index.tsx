import { Stack, Link, Redirect } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { HorizontalScrollView } from "~/components/HorizontalSlider"

export default function Home() {
  const isOnboarded = false;
  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Container>
        <HorizontalScrollView/>
      </Container>
    </>
  );
}
