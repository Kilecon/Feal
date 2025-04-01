import { Stack } from 'expo-router';
import React from 'react';

import { AddPlantList } from '~/components/AddPlantList';
import { DetailsPlantList } from '~/components/DetailsPlantList';
import { SectionTitle } from '~/components/SectionTitle';
import { Box, Text } from '~/theme';
import database from '@react-native-firebase/database';

export default function Home() {
  database()
    .ref('/0000')
    .once('value')
    .then((snapshot) => {
      console.log('User data: ', snapshot.val());
    });

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
