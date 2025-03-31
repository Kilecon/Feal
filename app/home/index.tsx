import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'theme';
import { SectionTitle } from '~/components/SectionTitle';
import { Box } from '~/theme';
import { DetailsPlantList } from '~/components/DetailsPlantList';
import { AddPlantList } from '~/components/AddPlantList';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Box
        flexDirection="column"
        flex={1}
        style={{ gap: 24 }}
        backgroundColor="background"
        paddingTop="xl_64">
        <Text variant="medium" paddingHorizontal="ml_24">
          Hi buddie
        </Text>

        <Box>
          <SectionTitle title="Your plants" />
          <DetailsPlantList />
        </Box>

        <Box flex={1} flexDirection="column" gap="ml_24">
          <SectionTitle title="Add plant" />
          <AddPlantList />
        </Box>
      </Box>
    </>
  );
}
