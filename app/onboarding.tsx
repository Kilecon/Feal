import { Stack } from 'expo-router'
import { OnboardingScreen } from '~/screens/OnboardingScreen'

export default function Onboarding() {
    return (
    <>
    <Stack.Screen options={{ gestureEnabled: false}}/>
    <OnboardingScreen/>
    </>
    );
}