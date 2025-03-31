import React from 'react';
import { ScrollView } from 'react-native';

import { DetailsCard } from '~/components/DetailsCard';
import useStorage from '~/core/storage';
import { Box, Text } from '~/theme';
import { LocalPlant } from '~/types/storage.type';

export const DetailsPlantList = () => {
  const [localPlants] = useStorage<LocalPlant[]>('localPlants');

  if (!localPlants?.length) {
    return (
      <Box flexDirection="row" justifyContent="center" alignItems="center" padding="ml_24">
        <Text>No plants saved</Text>
      </Box>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 15,
        paddingTop: 36,
      }}>
      {localPlants.map((plant: LocalPlant) => (
        <DetailsCard localPlant={plant} key={plant.id} />
      ))}
    </ScrollView>
  );
};
