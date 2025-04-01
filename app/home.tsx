import { Stack } from 'expo-router';
import React from 'react';

import { AddPlantList } from '~/components/AddPlantList';
import { DetailsPlantList } from '~/components/DetailsPlantList';
import { SectionTitle } from '~/components/SectionTitle';
import { Box, Text } from '~/theme';

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
