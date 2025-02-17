import { Link, Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text } from 'theme';

import { Button } from '~/components/Button';
import { DetailsCard } from '~/components/DetailsCard';
import { SectionTitle } from '~/components/SectionTitle';
import { Box } from '~/theme';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Box
        flexDirection="column"
        flex={1}
        style={{ gap: 24 }}
        backgroundColor="background"
        paddingTop="l_32">
        <Text variant="medium" paddingHorizontal="ml_24">
          Hi buddie
        </Text>

        <Box paddingHorizontal="ml_24">
          <SectionTitle title="Your plants" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              paddingTop: 36,
            }}>
            <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
            <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
          </ScrollView>
        </Box>

        <Box flex={1} flexDirection="column" gap="ml_24">
          <Box paddingHorizontal="ml_24">
            <SectionTitle title="Add plant" />
          </Box>

          <Box
            backgroundColor="darkGreen"
            flex={1}
            borderTopLeftRadius="base"
            borderTopRightRadius="base"
            padding="m_16">
            <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
              <Button title="Show Details" />
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
